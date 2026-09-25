# MastiSense AI

Software-only React/Vite prototype for **AI-Based Predictive Modelling for Early Forecasting of Bovine Mastitis in Indian Dairy Farms**.

## Run
```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Demo accounts
- Farmer: `farmer@mastisense.ai` / `farmer123`
- Admin: `admin@mastisense.ai` / `admin123`

## Notes
- No backend, sensors, IoT, Arduino, ESP32, MPU6050, Bluetooth or live sensor data.
- Data persists in browser localStorage.
- `src/utils/predictionEngine.js` contains the transparent prototype scoring engine and is explicitly not clinically validated.
- Demo data is seeded on first load.
