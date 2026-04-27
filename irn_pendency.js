/*
    IRN Pendency Tracker - Functional JavaScript Logic (irn_pendency.js)
    
    This script implements the logic to:
    1. Read multiple Excel/CSV files using the SheetJS (XLSX) library (which must be included in the HTML).
    2. Merge the data into a single array.
    3. Generate a custom HTML pivot-like cross-tabulation (City, IRN Number vs. Status) with counts.
*/

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const statusMessage = document.getElementById('status-message');
    const pivotContainer = document.getElementById('pivot-table-container');

    statusMessage.textContent = "Script loaded. Ready to process files.";

    fileInput.addEventListener('change', handleFileSelect);

    /**
     * Handles file selection, reading, merging, and pivot table generation.
     * @param {Event} event - The file input change event.
     */
    function handleFileSelect(event) {
        const files = event.target.files;
        if (files.length === 0) {
            statusMessage.textContent = "Please select files to begin analysis.";
            pivotContainer.innerHTML = '<p style="text-align: center; color: var(--text-medium);">Data will load here after files are processed.</p>';
            return;
        }

        statusMessage.textContent = `Processing ${files.length} file(s)... This may take a moment.`;
        pivotContainer.innerHTML = '<p style="text-align: center; color: #0078D4;">Loading and merging data...</p>';
        
        // Define key columns for reference
        const requiredColumns = ["City", "IRN Number", "Status"];
        let allData = [];
        let filesProcessed = 0;
        let filesFailed = 0;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            // Use closure to capture file context
            reader.onload = (function(f) {
                return function(e) {
                    try {
                        // 1. Read the workbook using SheetJS (XLSX.read)
                        // Read as ArrayBuffer for binary file types (Excel)
                        const data = new Uint8Array(e.target.result);
                        const workbook = XLSX.read(data, { type: 'array', cellStyles: true });
                        
                        // 2. Convert the first sheet to an array of arrays (header: 1)
                        const sheetName = workbook.SheetNames[0];
                        const fileData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { 
                            header: 1, 
                            defval: "", 
                            raw: false 
                        }); 
                        
                        if (fileData.length < 2) {
                            console.warn(`File ${f.name} is empty or only contains headers.`);
                            return;
                        }

                        // Simple header mapping: find indices of required columns, case-insensitive
                        const headers = fileData[0].map(h => String(h).trim());
                        const columnIndices = {
                            City: headers.findIndex(h => h.toLowerCase() === 'city'),
                            IRN: headers.findIndex(h => h.toLowerCase() === 'irn number' || h.toLowerCase() === 'irn'),
                            Status: headers.findIndex(h => h.toLowerCase() === 'status'),
                        };
                        
                        // Check if all essential columns are found
                        if (columnIndices.City === -1 || columnIndices.IRN === -1 || columnIndices.Status === -1) {
                            console.error(`File ${f.name} is missing essential columns (City, IRN Number, Status).`);
                            filesFailed++;
                            return;
                        }

                        // 3. Filter and map the 'fileData' (skip header row)
                        const mappedData = fileData.slice(1).map(row => ({
                            City: String(row[columnIndices.City] || 'N/A').trim(),
                            'IRN Number': String(row[columnIndices.IRN] || 'N/A').trim(),
                            Status: String(row[columnIndices.Status] || 'N/A').toLowerCase().trim(),
                        })).filter(item => item.City && item['IRN Number'] && item.Status && item.City !== 'N/A'); // Basic row filtering

                        // 4. Merge the filtered data
                        allData.push(...mappedData);
                        
                    } catch (error) {
                        console.error(`Error processing file ${f.name}:`, error);
                        filesFailed++;
                    } finally {
                        filesProcessed++;
                        updateStatus(filesProcessed, files.length, filesFailed);

                        if (filesProcessed === files.length) {
                            // 5. Once all files are processed, generate the pivot table
                            if (allData.length > 0) {
                                const pivotHTML = generatePivotTableHTML(allData, ['City', 'IRN Number'], 'Status');
                                pivotContainer.innerHTML = pivotHTML;
                                statusMessage.textContent = `✅ Successfully merged and analyzed ${allData.length} records from ${files.length} file(s).`;
                            } else {
                                pivotContainer.innerHTML = '<p style="text-align: center; color: #cc0000; font-weight: 600;">⚠️ Could not find valid IRN data in any uploaded file.</p>';
                                statusMessage.textContent = `❌ Analysis failed. No valid data found after processing ${files.length} file(s).`;
                            }
                        }
                    }
                }
            })(file);
            
            reader.onerror = () => {
                filesProcessed++;
                filesFailed++;
                updateStatus(filesProcessed, files.length, filesFailed);
            };

            // Start reading the file as an ArrayBuffer for SheetJS
            reader.readAsArrayBuffer(file);
        }
    }

    /**
     * Updates the status message during processing.
     */
    function updateStatus(processed, total, failed) {
         let message = `Processed ${processed} of ${total} files.`;
         if (failed > 0) {
            message += ` (${failed} failed or invalid)`;
         }
         statusMessage.textContent = message;
    }

    /**
     * Generates a basic HTML pivot table from the merged data.
     * Pivot: Rows: [City, IRN Number], Columns: [Status], Values: Count.
     * @param {Array<Object>} data - The merged array of data objects.
     * @param {string[]} rowFields - The fields to use for row grouping. (e.g., ['City', 'IRN Number'])
     * @param {string} colField - The field to use for column cross-tabulation. (e.g., 'Status')
     * @returns {string} - The HTML string for the pivot table.
     */
    function generatePivotTableHTML(data, rowFields, colField) {
        // 1. Aggregate the data (Count of IRN Numbers by City and Status)
        const aggregation = {};
        const uniqueColValues = new Set();
        const rowKeys = new Set();

        data.forEach(row => {
            const rowKey = rowFields.map(f => row[f]).join('|||'); // Unique key for combined row fields
            const colValue = row[colField];

            rowKeys.add(rowKey);
            uniqueColValues.add(colValue);

            if (!aggregation[rowKey]) {
                aggregation[rowKey] = {};
            }
            aggregation[rowKey][colValue] = (aggregation[rowKey][colValue] || 0) + 1;
        });

        const sortedColValues = Array.from(uniqueColValues).sort();
        const sortedRowKeys = Array.from(rowKeys).sort();

        // 2. Build the HTML table
        let html = '<table>';

        // Header Row
        html += '<tr>';
        rowFields.forEach(field => html += `<th>${field}</th>`);
        sortedColValues.forEach(col => html += `<th>${col} (Count)</th>`);
        html += '<th>Grand Total</th>';
        html += '</tr>';

        // Data Rows
        let grandTotalCol = {};
        let grandTotalAll = 0;

        let previousRowKeys = rowFields.map(() => null);

        sortedRowKeys.forEach(rowKey => {
            const rowValues = rowKey.split('|||');
            const rowData = aggregation[rowKey];
            let rowTotal = 0;

            html += '<tr>';

            // Row Field Cells (Grouped view)
            rowFields.forEach((field, index) => {
                const currentValue = rowValues[index];
                const previousValue = previousRowKeys[index];

                // For the first column (City), only display if it's different from the previous row's City.
                // For the second column (IRN Number), always display it since we're pivoting by IRN Number.
                if (index === 0 && currentValue === previousValue) {
                    html += '<td></td>'; 
                } else {
                    html += `<td>${currentValue}</td>`;
                    previousRowKeys[index] = currentValue;

                    // If a higher-level field changes (City), reset the lower-level field's "previous" value
                    // This ensures the IRN column logic is correct if City changes (though IRN is the lowest level here)
                    if (index === 0 && rowFields.length > 1) {
                         previousRowKeys[1] = null; // Reset IRN Number tracker
                    }
                }
            });

            // Status Counts
            sortedColValues.forEach(col => {
                const count = rowData[col] || 0;
                html += `<td>${count}</td>`;
                rowTotal += count;
                grandTotalCol[col] = (grandTotalCol[col] || 0) + count;
            });

            // Row Grand Total
            html += `<td>${rowTotal}</td>`;
            grandTotalAll += rowTotal;
            html += '</tr>';
        });

        // Grand Total Row
        html += '<tr class="grand-total">';
        html += '<td>Grand Total</td>';
        // Add placeholders for remaining row key columns (just the IRN Number column in this case)
        for (let i = 1; i < rowFields.length; i++) {
            html += '<td></td>';
        }
        
        sortedColValues.forEach(col => html += `<td>${grandTotalCol[col] || 0}</td>`);
        html += `<td>${grandTotalAll}</td>`;
        html += '</tr>';

        html += '</table>';
        
        return html;
    }
});