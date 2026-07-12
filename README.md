# Parental Legacy & Life Factors Calculator

A premium, interactive web application built with React, Tailwind CSS v4, and Recharts to calculate genetic, mental, and spiritual lineage metrics based on a user's date of birth. This application was built as part of the MERN Full Stack Developer assessment for **Neutrino Veda**.

## Features

- **Automated Calculation Logic**: Odd-day inputs result in higher Mother values, and even-day inputs favor Father values.
- **Normalization (100% Correct)**: All calculations strictly respect factor-specific min/max ranges and normalize dynamically so the total sum across all components is exactly `100.000`.
- **Interactive Visualizations**: Includes side-by-side Radar and Bar charts comparing Mother and Father legacy profiles.
- **Export Capabilities**:
  - Export report as PDF (HTML Canvas to PDF conversion).
  - Export report as CSV.
- **Data Persistence**: Save profiles locally to access later (using `localStorage` history).
- **Responsive Premium Theme**: Smooth light/dark mode transitions built using Tailwind CSS v4.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone this repository (or navigate to this folder):
   ```bash
   git clone https://github.com/rraviprasad/Parental-Legacy-Life-Factors-Calculator.git
   cd Parental-Legacy-Life-Factors-Calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server locally:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

4. Build for production:
   ```bash
   npm run build
   ```

## Technology Stack

- **Frontend**: React.js (Functional components, Hooks)
- **Styling**: Tailwind CSS v4 (with PostCSS)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Exporting**: jsPDF & html2canvas
