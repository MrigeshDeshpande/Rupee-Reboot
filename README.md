# RupeeReboot - Salary Simulator

![RupeeRoboot Landing Page](https://github.com/user-attachments/assets/22f08d05-5bd0-4ce6-b39d-00601a29cce4)  
*"Because adulting is hard—but money math shouldn’t be."*

## Why I Built This

As a 20-something in India, I watched friends stress over questions like:  
- *"Should I take this ₹5L pay jump if rent doubles?"*  
- *"Why does my salary vanish by the 20th?"*  

Existing tools felt **overwhelming** or **boring** (Excel). So I built RupeeReboot:  
- **Simulate life’s "what-ifs"** with sliders (no spreadsheets).  
- **Instant visual feedback** via dynamic charts.  
- **Designed for Indian millennials** out of courtesy

## ✨ Features  

| Feature | Description |  
|---------|-------------|  
| **Salary Playground** | Drag sliders to simulate raises, rent hikes, or investment changes. |  
| **Donut Charts** | Visualize where your money *actually* goes. |  
| **Peer Comparison** | See how your spending stacks up against anonymized users. |  
<!-- | **Time Machine** | Project your net worth in 5/10 years (with optimistic/pessimistic modes). |   -->

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

- **"Financial Roast" Mode** (*"Bro, you spend more on chai than GDP of Goa"*)  
- **Dark Mode** (Because midnight salary anxiety is real)  

## 🙌 How to Run Locally  

```bash
git clone https://github.com/MrigeshDeshpande/rupee-reboot.git
cd rupee-reboot
npm install
npm run dev