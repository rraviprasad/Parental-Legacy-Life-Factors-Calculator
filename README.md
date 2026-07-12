# 🧬 Parental Legacy & Life Factors Calculator

A modern, responsive React web application that calculates life factor values (Genetic Inheritance, Constitutional Vitality, Mental Patterns, etc.) based on a user's Date of Birth. The app displays a breakdown of **Mother** vs **Father** contributions, totaling exactly **100 points**, and includes interactive charts, export options, and JWT-based authentication.

> Built as a Full Stack Developer Assessment for **Neutrino Veda**.

---

## 🌐 Live Demo

🔗 **Deployed URL**: _[Add your deployed URL here]_

🔗 **GitHub Repo**: [https://github.com/rraviprasad/Parental-Legacy-Life-Factors-Calculator](https://github.com/rraviprasad/Parental-Legacy-Life-Factors-Calculator)

---

## 📸 Screenshots

### 🔐 Login / Register
| Light Mode | Dark Mode |
|:---:|:---:|
| ![Login Light](screenshots/login-light.png) | ![Login Dark](screenshots/login-dark.png) |

### 📊 Results Dashboard
| Light Mode | Dark Mode |
|:---:|:---:|
| ![Results Light](screenshots/results-light.png) | ![Results Dark](screenshots/results-dark.png) |

### 📈 Charts
| Radar Chart | Bar Chart |
|:---:|:---:|
| ![Radar](screenshots/radar-chart.png) | ![Bar](screenshots/bar-chart.png) |

---

## ✨ Features

### ✅ Core Features (Must Have)

| Feature | Description |
|---|---|
| **DOB Input** | Native date picker for selecting Date of Birth |
| **Validation** | Ensures date is valid and not in the future |
| **Auto-Calculation** | Values are auto-generated immediately on date selection |
| **Value Display** | Shows Mother, Father, and Total for each of the 7 life factors |
| **Totals** | Displays Mother Total, Father Total, and Grand Total (always = 100) |
| **Parental Legacy** | Highlights which parent has higher overall values |
| **Charts** | Radar & Bar charts for visual Mother vs Father comparison |
| **Responsive Design** | Fully responsive — works on desktop, tablet, and mobile |

### 🌟 Bonus Features

| Feature | Points | Status |
|---|---|---|
| Export Results as **PDF** | +5 | ✅ Implemented |
| Export Results as **CSV** | +5 | ✅ Implemented |
| **Dark/Light Mode** Toggle | +5 | ✅ Implemented (animated toggle switch) |
| **Save Results** (localStorage) | +10 | ✅ Implemented (with history view) |
| **User Authentication** (JWT) | +10 | ✅ Implemented (login/register with token) |
| **Total Bonus Points** | **+35** | 🎯 |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | Frontend UI framework |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first CSS styling |
| **Recharts** | Data visualization (Radar & Bar charts) |
| **Lucide React** | Beautiful icon library |
| **jsPDF** | Client-side PDF generation |
| **JWT (Client-side)** | Token-based authentication |
| **localStorage** | Data persistence & session management |

---

## 📁 Project Structure

```
Parental Legacy & Life Factors Calculator/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AuthForm.jsx         # Login / Register form with JWT
│   │   ├── CalculatorForm.jsx   # DOB input with auto-calculation
│   │   ├── Charts.jsx           # Radar & Bar chart components
│   │   └── ResultsDisplay.jsx   # Results table + PDF/CSV export
│   ├── utils/
│   │   ├── auth.js              # JWT token creation, verification, login/register
│   │   └── calculations.js     # Life factor calculation logic (normalized to 100)
│   ├── App.jsx                  # Main app with routing, auth gate, theme toggle
│   ├── App.css                  # Additional styles
│   ├── index.css                # Tailwind CSS config with dark mode variant
│   └── main.jsx                 # React entry point
├── index.html                   # HTML entry with SEO meta tags
├── package.json
├── vite.config.js
├── postcss.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/rraviprasad/Parental-Legacy-Life-Factors-Calculator.git

# 2. Navigate to the project directory
cd Parental-Legacy-Life-Factors-Calculator

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be running at **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔐 Authentication Flow

1. **Register** — Create a new account with name, email, and password
2. **Login** — Sign in with your credentials
3. A **JWT token** is generated and stored in `localStorage`
4. Token includes user payload with `iat` (issued at) and `exp` (expiry: 24 hours)
5. On app load, the token is verified — expired tokens are automatically cleared
6. **Logout** clears the token and returns to the login screen

> **Note**: This implementation uses client-side JWT to demonstrate token structure and authentication flow. In a production environment, JWT should be generated and verified server-side with a secure secret key.

---

## 📊 Calculation Logic

The calculator generates **7 life factors**, each with Mother and Father contributions:

| # | Life Factor | Value Range |
|---|---|---|
| 1 | Genetic Inheritance | 9.333 – 10.777 |
| 2 | Constitutional Vitality | 8.111 – 9.111 |
| 3 | Mental Patterns | 6.111 – 7.111 |
| 4 | Intellectual Capacity | 6.333 – 6.999 |
| 5 | Emotional Foundation | 7.111 – 7.999 |
| 6 | Spiritual Lineage | 5.011 – 6.011 |
| 7 | Soul Connections | 5.111 – 6.222 |

**Key behaviors:**
- Values are **deterministic** — the same DOB always produces the same results
- **Odd-day births** lean toward higher Mother values
- **Even-day births** lean toward higher Father values
- All values are **normalized** so **Grand Total = 100.000** exactly

---

## 📤 Export Options

### PDF Export
- Generates a professionally formatted PDF report
- Includes title, DOB, factor table with colored columns, and totals
- Branded with Neutrino Veda footer

### CSV Export
- Downloads a clean CSV file with headers: Factor, Mother Value, Father Value, Total
- Compatible with Excel, Google Sheets, and other spreadsheet tools

---

## 🎨 UI/UX Highlights

- **Premium Design** — Gradient headers, glass-morphism cards, and subtle shadows
- **Animated Toggle** — Smooth sliding toggle switch for dark/light mode
- **Hover Effects** — Interactive table rows and card hover animations
- **Color-Coded Data** — Mother (pink), Father (blue) throughout all views
- **Responsive Layout** — Adapts from mobile to desktop with fluid grid system
- **Custom Chart Legends** — Consistent Mother/Father color labeling

---

## 👤 Developer

**Ravi Prasad**  
📧 raviprasad93335@gmail.com  
🔗 [GitHub: rraviprasad](https://github.com/rraviprasad)

---

## 📄 License

This project is built as part of the Neutrino Veda assessment task.

© 2026 Neutrino Veda. All rights reserved.
