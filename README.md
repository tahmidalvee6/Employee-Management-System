# Employee Management System

A full-stack Employee Management System built on the MERN stack (MongoDB, Express, React, Node.js), featuring separate Admin and Employee portals for attendance, leave, and payslip management.

**Live Demo:** [employee-management-system-hctnrcmda-alvee6.vercel.app](https://employee-management-system-hctnrcmda-alvee6.vercel.app)

---

## Features

### Admin Pages

- **Admin Dashboard** — KPI cards, recent activity feed, and chart overview
- **Employee Management** — Searchable/filterable table with add, edit, delete actions and photo upload
- **Attendance Records** — Monthly calendar view and tabular attendance log per employee
- **Leave Requests** — Pending queue with approve/reject action and history tab
- **Payslip Management** — Generate, view, and email payslips; bulk generation for the current month
- **Analytics Dashboard** — Full-page charts and smart insights
- **Settings** — Admin profile update, password change, and notification preferences

### Employee Pages

- **Employee Dashboard** — Profile card, today's attendance, leave balance, and latest payslip
- **My Attendance** — Daily log view and monthly summary chart
- **Apply for Leave** — Leave application form with type selection, date picker, and reason field
- **My Payslips** — List of all payslips with print option
- **Payslip Print View** — Formatted printable payslip page
- **Feedback** — Star rating and text feedback submission form
- **Settings** — Update personal contact details and profile picture

### Unique Feature — Analytics Dashboard with Smart Insights

A comprehensive Analytics and Smart Insights Dashboard built with Recharts, transforming raw HR data into actionable visual intelligence:

- **Employee Statistics Chart** — Bar chart comparing headcount across departments
- **Attendance Heat Map** — Monthly calendar-style heat map showing attendance density per day
- **Leave Trend Line Chart** — Monthly leave application count over the past 12 months
- **Payroll Cost Chart** — Monthly payroll expenditure trend for budget tracking
- **Employee Growth Chart** — Line chart showing onboarding trend over time
- **Satisfaction Score Gauge** — Aggregated employee feedback score with colour-coded indicator

### Automated Background Jobs (Inngest)

- Automatic monthly payslip generation triggered on the 1st of every month
- Automated attendance summary emails at the end of each month
- Leave balance reset job at the start of each calendar year

---

## Tech Stack

### Frontend

| Technology       | Purpose             | Details                                       |
|-------------------|----------------------|------------------------------------------------|
| React.js          | UI Framework         | Component-based SPA with hooks and context     |
| React Router DOM  | Client-side Routing   | Protected routes for Admin and Employee        |
| Tailwind CSS      | Styling               | Utility-first responsive design system         |
| Axios             | HTTP Client           | REST API communication with the backend        |
| Recharts          | Data Visualisation    | Charts for the analytics dashboard             |
| Firebase Auth     | Authentication        | Email/Password and Google login                |

### Backend

| Technology        | Purpose                | Details                                        |
|---------------------|--------------------------|--------------------------------------------------|
| Node.js             | Runtime Environment       | JavaScript runtime for server-side logic          |
| Express.js          | Web Framework             | RESTful API development and middleware            |
| Mongoose            | ODM                       | Schema definition and MongoDB interaction          |
| JSON Web Token       | Auth Tokens               | Stateless session management                       |
| Bcrypt.js            | Password Hashing          | Secure storage of credentials                      |
| Nodemailer           | Email Service             | Automated notifications and payslip emails         |
| Inngest              | Background Jobs           | Scheduled tasks (monthly payslip generation)       |
| dotenv               | Environment Variables      | Secure config management                           |

### Database

| Technology      | Purpose            | Details                                              |
|-------------------|-----------------------|---------------------------------------------------------|
| MongoDB Atlas     | Primary Database        | Cloud-hosted NoSQL database, minimum 5 collections        |

---

## Team

<table>
  <tr>
    <th>Frontend</th>
    <th>Backend</th>
  </tr>
  <tr>
    <td valign="top">
      Tokitul Osmani<br/>
      Sudipta Pal
    </td>
    <td valign="top">
      Tahmid Alvee<br/>
      Soumen Sen
    </td>
  </tr>
</table>

---

## License

This project is for educational purposes.
