const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// The HTML/CSS/JS is stored in this variable to ensure it's always found
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FinanceFlow Pro</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        :root { --glass: rgba(255, 255, 255, 0.2); --text: #ffffff; }
        body { 
            font-family: 'Inter', sans-serif; 
            background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
            min-height: 100vh; margin: 0; padding: 20px; color: var(--text);
            display: flex; flex-direction: column; align-items: center;
        }
        .container { 
            background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(15px);
            border: 1px solid rgba(255,255,255,0.2); padding: 25px;
            border-radius: 24px; width: 100%; max-width: 400px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        h2 { text-align: center; font-weight: 600; letter-spacing: -1px; margin-bottom: 25px; }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 25px; }
        .stat-card { background: rgba(255,255,255,0.1); padding: 12px; border-radius: 15px; text-align: center; font-size: 0.75rem; border: 1px solid rgba(255,255,255,0.1); }
        .stat-card strong { display: block; font-size: 1.1rem; color: #00d2ff; margin-top: 5px; }
        input, select { 
            width: 100%; padding: 14px; margin: 8px 0; border-radius: 12px;
            border: none; background: rgba(255,255,255,0.9); color: #333; font-size: 1rem; box-sizing: border-box;
        }
        button { 
            width: 100%; padding: 16px; margin-top: 10px; border-radius: 12px; border: none;
            background: #00d2ff; color: #0f0c29; font-weight: 700; cursor: pointer; transition: 0.2s;
        }
        button:hover { transform: scale(1.02); background: #3a7bd5; color: white; }
        #history { margin-top: 30px; }
        .item { 
            background: rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; 
            margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;
            border-left: 4px solid #00d2ff;
        }
        .item-info { display: flex; flex-direction: column; }
        .item-date { font-size: 0.7rem; color: #aaa; }
    </style>
</head>
<body>
    <div class="container">
        <h2>FinanceFlow</h2>
        <div class="stats-grid">
            <div class="stat-card">Today<strong id="d-total">$0</strong></div>
            <div class="stat-card">Week<strong id="w-total">$0</strong></div>
            <div class="stat-card">Month<strong id="m-total">$0</strong></div>
        </div>
        <input type="text" id="title" placeholder="What did you buy?">
        <input type="number" id="amount" placeholder="Amount ($)">
        <select id="category">
            <option value="Food">🍔 Food & Drink</option>
            <option value="Transport">🚗 Transport</option>
            <option value="Shopping">🛍️ Shopping</option>
            <option value="Bills">🔌 Bills</option>
        </select>
        <input type="date" id="date">
        <button onclick="saveExpense()">Add Expenditure</button>
        <div id="history"></div>
    </div>

    <script>
        let data = JSON.parse(localStorage.getItem('my_expenses')) || [];

        function saveExpense() {
            const title = document.getElementById('title').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const date = document.getElementById('date').value;
            const category = document.getElementById('category').value;

            if(!title || !amount || !date) {
                alert("Please fill in all fields");
                return;
            }

            data.unshift({ title, amount, date, category, id: Date.now() });
            localStorage.setItem('my_expenses', JSON.stringify(data));
            
            // Clear inputs
            document.getElementById('title').value = '';
            document.getElementById('amount').value = '';
            
            updateUI();
        }

        function updateUI() {
            const history = document.getElementById('history');
            history.innerHTML = "";
            let d=0, w=0, m=0;
            const now = new Date();

            data.forEach(ex => {
                const exDate = new Date(ex.date);
                
                // Calculations
                if(exDate.toDateString() === now.toDateString()) d += ex.amount;
                const diffDays = (now - exDate) / (1000 * 60 * 60 * 24);
                if(diffDays >= 0 && diffDays <= 7) w += ex.amount;
                if(exDate.getMonth() === now.getMonth() && exDate.getFullYear() === now.getFullYear()) m += ex.amount;

                // Build History List
                history.innerHTML += \`
                    <div class="item">
                        <div class="item-info">
                            <strong>\${ex.title}</strong>
                            <span class="item-date">\${ex.category} • \${ex.date}</span>
                        </div>
                        <strong>$\${ex.amount.toFixed(2)}</strong>
                    </div>\`;
            });

            document.getElementById('d-total').innerText = '$' + d.toFixed(2);
            document.getElementById('w-total').innerText = '$' + w.toFixed(2);
            document.getElementById('m-total').innerText = '$' + m.toFixed(2);
        }

        document.getElementById('date').valueAsDate = new Date();
        updateUI();
    </script>
</body>
</html>
`;

// ROUTE: When someone visits the URL, send the HTML directly
app.get('/', (req, res) => {
    res.send(htmlContent);
});

app.listen(PORT, () => {
    console.log(\`App is running on port \${PORT}\`);
});
