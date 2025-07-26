# 🎓 UIU Alumni & Teaching Assistant Management System

**Automated TA Recruitment and Alumni Engagement Platform**

UIU Alumni & TA Management System is a comprehensive web application that streamlines teaching assistant recruitment and enhances alumni engagement through automated processes. The system reduces manual workload by 60% and provides seamless TA assignment, alumni interaction, and job posting capabilities for universities.

## 🎥 Demo Video

[![UIU Alumni & TA Management System Demo](https://img.shields.io/badge/▶️-Watch%20Demo%20Video-red?style=for-the-badge&logo=youtube)](https://youtu.be/-mV51W-Qllk?si=YeSCScxYHDzIz25X)

*Click the badge above to watch a complete demonstration of the Alumni & TA Management System in action!*

## 🎨 UI/UX Design

[![Figma Design](https://img.shields.io/badge/🎨-View%20Figma%20Design-purple?style=for-the-badge&logo=figma)](https://www.figma.com/design/Y4lmyzCK08XQ5R84mKJADS/Rakib?node-id=0-1&t=cJ3i6NqmuKPzwzyU-1)

*Explore the complete UI/UX design and prototypes created in Figma before development!*

## 🚀 Features

### 👨‍🎓 Teaching Assistant Management

#### 🔄 Automated Recruitment Process
- **Streamlined Application**: Students can apply for TA positions with minimal effort as most information is automatically pulled from their account profiles
- **Excel Integration**: Admin uploads course information via Excel sheets containing course names, sections, and faculty emails
- **Auto-Assignment**: Once recruitment starts, courses are automatically included in respective faculty profiles

#### 📊 Priority-Based Sorting
The system automatically sorts TA applications based on:
1. **Faculty Recommendations** (Highest Priority)
2. **CGPA** (Academic Performance)
3. **Experience** (Previous TA/Work Experience)
4. **Completed Credits** (Academic Progress)

#### 🤝 Faculty Recommendation System
- Students can request recommendations from faculty members for TA roles
- Faculty can provide recommendations that boost application priority
- Seamless integration with the sorting algorithm

#### 📋 Dynamic Task Management
- Once students are associated with faculty, dynamic task assignment becomes available
- Real-time task tracking and management
- Efficient workload distribution

### 🎓 Alumni Engagement System

#### 🔄 Automated Profile Upgrades
- **Credit-Based Transition**: Students with 137+ completed credits can request alumni profile upgrade
- **Automated Processing**: Streamlined transition from student to alumni status
- **Profile Enhancement**: Enhanced features and access upon alumni status confirmation

#### 🎉 Event Management
- Alumni event participation tracking
- Event notifications and updates
- Community engagement features

#### 💼 Job Posting Platform
Multiple user types can post job opportunities:
- **Faculty**: Academic and research positions
- **Alumni**: Industry opportunities and referrals
- **Department (Admin)**: Official university positions

### 🛡️ Safety & Communication

#### 💬 Messaging System
- **Direct Communication**: Built-in messaging feature for seamless interaction between users
- **Cross-Role Messaging**: Students, faculty, and alumni can communicate effectively

#### 📢 Manual Reporting & Blocking System
- **User Reporting**: Alumni can manually report inappropriate user behavior
- **Admin Action**: Department administrators can take action on reported users
- **Strategic Blocking**: When blocked by department action, users lose access to all features except task management
- **TA Protection**: Currently associated teaching assistants retain task management access for the current trimester only
- **Thoughtful Design**: System designed with careful consideration for user rights and academic continuity

## 🛠️ Technical Stack

- **Backend**: Django REST Framework
- **Frontend**: React.js
- **Languages**: JavaScript, HTML, CSS
- **Database**: SQLite3
- **Design**: Figma (UI/UX prototyping)
- **Architecture**: RESTful API design
- **Development Tools**: Postman for API testing

## 📋 System Requirements

- Python 3.8 or higher
- Node.js 14 or higher
- SQLite3 (included with Python)
- npm or yarn package manager

## 🚀 Getting Started

### Backend Setup (Django)

1. **Clone the repository**
   ```bash
   git clone https://github.com/rakib73520/System-Design-Project.git
   cd System-Design-Project/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Database setup**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Run the server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup (React)

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

## 👥 User Roles

### 👑 Administrator
- Start and manage TA recruitment processes
- Upload course information via Excel sheets
- Monitor application sorting and assignments
- Handle user reports and blocking decisions
- Monitor communication safety through manual reporting system
- Manage alumni profile upgrade requests
- Post department job opportunities

### 👨‍🏫 Faculty
- **TA Assignment**: Assign and manage tasks for associated teaching assistants
- **Student Recommendations**: Provide recommendations for students applying for TA roles
- **Job Opportunities**: Post job opportunities for students and alumni
- **Course Management**: Manage TA assignments for their respective courses

### 🎓 Students
- **TA Applications**: Apply for TA positions with automated form filling
- **Faculty Recommendations**: Request recommendations from faculty members
- **Task Management**: Complete assigned tasks and track progress
- **Profile Management**: Update skills section and career information in profile
- **Alumni Transition**: Request alumni profile upgrade (137+ credits)
- **Job Access**: Browse and access job postings

### 🎓 Alumni
- Participate in alumni events
- Access exclusive job postings
- Network with current students and faculty
- Receive and respond to communications (with safety measures)

## 📊 Key Metrics

- **60% Reduction** in manual workload for TA recruitment
- **Automated Processing** of applications with priority-based sorting
- **Enhanced Communication** through built-in messaging system
- **Safe Environment** with manual reporting and strategic blocking features

## 🎯 Project Objectives

This system was developed to:
- **Automate Administrative Tasks**: Reduce manual effort in TA recruitment and management
- **Enhance User Experience**: Streamlined applications and task management
- **Improve Alumni Relations**: Seamless transition and ongoing engagement
- **Ensure Safety**: Built-in moderation for secure communications
- **Fair TA Selection**: Priority-based sorting for equitable teaching assistant assignments

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for:
- Feature enhancements
- Bug fixes and improvements
- UI/UX improvements
- Documentation updates
- Performance optimizations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Rakibul Hasan**
- 📧 Email: rakibulhasan38556@gmail.com
- 💼 LinkedIn: [Rakibul Hasan](https://www.linkedin.com/in/rakibul-hasan-5539891a3/)
- 🐙 GitHub: [@rakib73520](https://github.com/rakib73520)
- 🏆 Competitive Programming: [Codeforces](https://codeforces.com/profile/rakib73520) | [LeetCode](https://leetcode.com/rakib73520)

---

*Built with ❤️ to streamline university administration and enhance alumni engagement*
