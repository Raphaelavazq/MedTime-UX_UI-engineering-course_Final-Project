

# MedTime: 
MedTime is a one-stop web application that makes access to medical services the easy way.

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Links](#links)
- [Installation and Setup](#installation-and-setup)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [What I Learned](#what-i-learned)
  - [Continued Development](#continued-development)
  - [Useful Resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)
- [Brand Guidelines](#brand-guidelines)
  - [Colors](#colors)
  - [Typography](#typography)
  - [Logo Usage](#logo-usage)
  - [UI Components](#ui-components)
  - [Layout and Spacing](#layout-and-spacing)
  - [Accessibility](#accessibility)
- [About](#about)
- [Resources](#resources)
- [Languages](#languages)
- [Suggested Workflows](#suggested-workflows)

## Overview

With MedTime, you can check emergency room and clinic waiting times, book appointments, and have video consultations. You can use the symptom checker to check on your symptoms or ask questions related to them using an AI-powered symptom checker bot. 
The aim is to provide real-time updates and information, so you can plan your visits more effectively or even avoid going to the emergency rooms. 
It's all about making your healthcare experience smoother and more convenient.


### The Challenge

Users should be able to:

- Navigate a user-friendly interface to easily find the nearest Hospitals,  pharmacies,  and their information.
- View real-time waiting times for emergency rooms and clinics.
- Book virtual appointments with doctors.
- Symptoms Log that helps the patients observe and report symptoms.
- Use an AI-powered symptom checker bot for preliminary health assessments.

### Links

- Live Site URL: [Live Site](#)

## Installation and Setup

To get a local copy up and running, follow these simple steps:

### Prerequisites

Make sure you have Node.js and npm installed on your machine. You can download them from [Node.js](https://nodejs.org).

### Frontend Setup

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd MedTime/frontend
   ```

2. **Install NPM packages**:

   ```bash
   npm install
   ```

3. **Running the Frontend**:

   Start the development server:

   ```bash
   npm run dev
   ```

   Open your browser and navigate to:

   [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. **Navigate to the backend directory**:

   ```bash
   cd MedTime/backend
   ```

2. **Install NPM packages**:

   ```bash
   npm install
   ```

3. **Setup environment variables**:

   Create a `.env` file in the `backend` directory and add the necessary environment variables:

   ```env
   PORT=5000
   DATABASE_URL=<your-database-url>
   OPENAI_API_KEY=<your-openai-api-key>
   ```

4. **Running the Backend**:

   Start the backend server:

   ```bash
   npm run start
   ```

   The backend server will run on [http://localhost:5000](http://localhost:5000)

### API Setup

1. **Google Maps API**: Follow the instructions on the [Google Maps Platform](https://developers.google.com/maps/documentation/javascript/get-api-key) to get your API key and add it to your environment variables.
2. **OpenAI API**: Get your API key from [OpenAI](https://beta.openai.com/signup/) and add it to your environment variables as `OPENAI_API_KEY`.

## My Process

I am currently building this project as a part of my UX/UI engineering course. The project focuses on real-time service updates and user-friendly interfaces.

### Built With

- React
- Vite 
- Tailwind CSS
- Framer Motion
- Node.js
- Google Maps API
- Custom backend APIs
- OpenAI API
- React Hooks
- Context API

### What I Learned

This project provides a comprehensive experience in building a modern web application. I am learning to implement real-time data updates, manage state, and ensure a responsive design.

### Continued Development

As I continue to develop this project, I aim to:

- Implement user authentication
- Add features for rating and reviewing services
- Integrate third-party APIs for booking doctors page  and symptoms checker page. 

### Useful Resources

- [MDN Web Docs](https://developer.mozilla.org)
- [CSS-Tricks](https://css-tricks.com)
- [React Documentation](https://reactjs.org/docs/getting-started.html)

## Author

- **Rafaela Vaz**
  - Frontend Mentor - [@Raphaelavazq](https://www.frontendmentor.io/profile/Raphaelavazq)
  - GitHub - [@Raphaelavazq](https://github.com/Raphaelavazq)

## My Brand Guidelines

### Colors

- **Primary Colors**:
  - Blue: `#2462ea`
  - Yellow: `#FFC107`
- **Secondary Colors**:
  - Light Blue: `#5c6bc0`
  - Purple: `#512da8`
- **Neutral Colors**:
  - White: `#FFFFFF`
  - Gray: `#333333`

### Typography

- **Primary Font**: Montserrat
  - Example: `font-family: 'Montserrat', sans-serif;`
- **Secondary Font**: Poppins
  - Example: `font-family: 'Poppins', sans-serif;`
- **Font Weights**:
  - Light: 300
  - Regular: 400
  - Bold: 700

### Logo Usage

- Maintaining clear space around the logo.
- Primary Logo: Used for main branding and official documents.


### UI Components

- **Buttons**:
  - Primary Button: Background `#2462ea`, Text `#FFFFFF`
  - Secondary Button: Background `#FFFFFF`, Text `#2462ea`, Border `2px solid #2462ea`
- **Input Fields**: Background `#eee`, Border `1px solid #ccc`

### Layout and Spacing

- Use a 12-column grid system.
- Margin and padding increments of 4px, 8px, 16px, 32px.

### Accessibility

- Ensure sufficient color contrast.
- Use semantic HTML and ARIA roles.



## Acknowledgments

I would like to thank the instructors and staff at my course for their guidance and support throughout the project. Special thanks to all the open-source contributors whose libraries and tools made this project possible.

