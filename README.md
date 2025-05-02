# RupeeReboot - Salary Simulator

![RupeeRoboot Landing Page](https://github.com/user-attachments/assets/22f08d05-5bd0-4ce6-b39d-00601a29cce4)  
_"Because adulting is hard—but money math shouldn’t be."_

## Why I Built This

As a 20-something in India, I watched friends stress over questions like:

- _"Should I take this ₹5L pay jump if rent doubles?"_
- _"Why does my salary vanish by the 20th?"_

Existing tools felt **overwhelming** or **boring** (Excel). So I built RupeeReboot:

- **Simulate life’s "what-ifs"** with sliders (no spreadsheets).
- **Instant visual feedback** via dynamic charts.
- **Designed for Indian millennials** out of courtesy

## ✨ Features  

| Feature               | Description                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------- |
| **Salary Playground** | Experiment with financial scenarios using interactive sliders—adjust salaries, rent, or investments to see potential impacts. |
| **Donut Charts**      | Gain insight into your spending habits with visually engaging breakdowns that highlight exactly where your money flows. |
| **Peer Comparison**   | Measure your financial habits against anonymized user data to see how you stack up in different spending categories. |
| **Time Machine**      | Project your net worth in 5/10 years (with optimistic/pessimistic modes). | --> |

## 🛠️ Tech Stack

**Frontend**:

- React (Vite)
- Charts.js

**Backend**:

- Firebase (Auth + Firestore for saving profiles)

**Deployment**:

- Vercel (CI/CD setup)

<!-- ## Challenges & Lessons

1. **Real-Time Chart Sync**
   - Problem: D3.js animations lagged with rapid slider moves.
   - Fix: Debounced state updates + CSS transitions.

2. **Firebase Costs**
   - Problem: Free tier limits for user data storage.
   - Fix: Aggregated peer data to reduce reads.

3. **Mobile UX**
   - Problem: Sliders were unusable on small screens.
   - Fix: Custom thumb handles with larger touch areas.   -->

## 🚧 Future Roadmap

- **"Financial Roast" Mode** (_"Bro, you spend more on chai than GDP of Goa"_)
- **Dark Mode** (Because midnight salary anxiety is real)

## 🙌 How to Run Locally

```bash
git clone https://github.com/MrigeshDeshpande/rupee-reboot.git
cd rupee-reboot
npm install
npm run dev
```
