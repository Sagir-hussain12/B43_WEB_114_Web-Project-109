# **Tenant-Landlord Communication Platform**

A **frontend-focused** web application designed to streamline communication between tenants and landlords. The platform simplifies maintenance requests, rent payment tracking, and real-time messaging, ensuring transparency and efficiency in property management.

---

## **Features**

### **For Tenants**
1. **Maintenance Request System**:
   - Submit maintenance requests with details, urgency levels, and image uploads.
   - Track the status of requests (pending, in progress, completed).
2. **Rent Payment Tracker**:
   - View rent payment history and upcoming due dates.
   - Receive interactive rent reminders.
3. **Chat with Landlord**:
   - Real-time messaging for quick communication.
4. **Profile Management**:
   - Update personal information and communication preferences.

### **For Landlords**
1. **Property Management**:
   - View and manage multiple properties.
   - Track maintenance requests across properties.
2. **Rent Payment Overview**:
   - Monitor rent payment statuses and send reminders.
3. **Maintenance History**:
   - View and export maintenance reports.
4. **Chat with Tenants**:
   - Communicate with tenants in real-time.
5. **Reports**:
   - Generate financial and maintenance reports.

### **General Features**
- **Responsive Design**: Optimized for mobile and desktop use.
- **Multi-Language Support**: Language toggle for accessibility.
- **Dummy Chatbot**: A placeholder chatbot UI for future AI integration.

---

## **Technologies Used**
- **Frontend**:
  - React.js
  - Tailwind CSS
  - Lucide Icons
- **State Management**:
  - Zustand (or any other state management library)
- **Routing**:
  - React Router DOM
- **Backend**:
  - (Not implemented yet) Placeholder for future backend integration.

---

## **Screenshots**
Here are some screenshots of the platform:

1. **Tenant Dashboard**:
   ![Tenant Dashboard](screenshots/tenant-dashboard.png)
2. **Landlord Dashboard**:
   ![Landlord Dashboard](screenshots/landlord-dashboard.png)
3. **Maintenance Request Form**:
   ![Maintenance Request Form](screenshots/maintenance-form.png)
4. **Chat Interface**:
   ![Chat Interface](screenshots/chat-interface.png)

---

## **Setup Instructions**

### **Prerequisites**
- Node.js (v16 or higher)
- npm (v8 or higher)

### **Steps to Run the Project**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/tenant-landlord-platform.git
   cd tenant-landlord-platform
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm start
   ```

4. **Open the App**:
   Visit `http://localhost:3000` in your browser.

---

## **Folder Structure**
```
src/
├── assets/                  # Static assets (images, icons, etc.)
├── components/              # Reusable UI components
│   ├── common/              # Shared components (e.g., buttons, inputs)
│   ├── tenant/              # Tenant-specific components
│   ├── landlord/            # Landlord-specific components
│   └── auth/                # Authentication components (placeholder)
├── pages/                   # Page-level components
│   ├── LandingPage.jsx      # Landing page
│   ├── TenantDashboard.jsx  # Tenant dashboard
│   ├── LandlordDashboard.jsx # Landlord dashboard
│   └── AuthPage.jsx         # Authentication page (placeholder)
├── store/                   # Zustand store (or state management)
├── App.js                   # Main app component
├── index.js                 # Entry point
└── index.css                # Global styles
```

---

## **Future Enhancements**
1. **Backend Integration**:
   - Implement a backend server for data persistence and authentication.
2. **AI Chatbot**:
   - Integrate an AI-powered chatbot for tenant assistance.
3. **Authentication**:
   - Add user authentication (e.g., login, signup) for tenants and landlords.
4. **Real-Time Updates**:
   - Use WebSocket or Firebase for real-time updates (e.g., chat, request status).
5. **Export Functionality**:
   - Allow landlords to export reports in CSV or PDF format.

---

## **Contributing**
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to the branch.
4. Submit a pull request.

---

## **License**
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**
- [React](https://reactjs.org/) for the frontend framework.
- [Tailwind CSS](https://tailwindcss.com/) for styling.
- [Lucide Icons](https://lucide.dev/) for icons.
- [OpenAI](https://openai.com/) for future AI chatbot integration.

---

## **Contact**
For any questions or feedback, feel free to reach out:
- **Your Name**: [Your Email]
- **GitHub**: [Your GitHub Profile](https://github.com/your-username)

---

