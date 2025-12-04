# Portfolio Website

A modern, responsive static portfolio website built with HTML, CSS, JavaScript, and Bootstrap 5. Features a clean design, smooth animations, and client-side form validation.

## 🌟 Features

- **Responsive Design**: Mobile-first approach that works seamlessly on all devices
- **Modern UI**: Clean, professional design with smooth animations and hover effects
- **Accessibility**: Semantic HTML, ARIA attributes, keyboard navigation support
- **Dark Mode**: Toggle between light and dark themes with localStorage persistence
- **Project Showcase**: Grid layout with 6 project cards and detailed modals
- **Contact Form**: Client-side validation with inline error messages
- **Smooth Scrolling**: Animated navigation with active link highlighting
- **SEO Optimized**: Proper meta tags and semantic structure

## 📋 Sections

1. **Header/Navigation**: Sticky navbar with smooth scroll and active link highlighting
2. **Hero Section**: Eye-catching introduction with gradient background and CTA
3. **About Section**: Bio, skills with progress bars, and quick stats
4. **Projects Section**: 6 project cards with modals showing detailed information
5. **Contact Section**: Form with JavaScript validation and success feedback
6. **Footer**: Social links and copyright information

## 🚀 How to Run

### Option 1: Direct Open (Recommended)
Simply open `index.html` in your web browser. No server or build process required!

### Option 2: Local Server
For a better development experience, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## 📁 File Structure

```
/
├── index.html              # Main HTML file
├── README.md              # This file
├── .gitignore             # Git ignore rules
└── assets/
    ├── css/
    │   └── styles.css     # Custom styles
    ├── js/
    │   └── main.js        # JavaScript functionality
    └── img/
        └── profile.jpg    # Profile image
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styles with CSS variables
- **JavaScript (ES6+)**: Modern vanilla JavaScript
- **Bootstrap 5.3.2**: Responsive framework
- **Bootstrap Icons**: Icon library
- **Google Fonts**: Inter font family

## ✨ Key Features Explained

### Form Validation
The contact form includes comprehensive client-side validation:
- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format with regex validation
- **Message**: Required, minimum 15 characters
- **Subject**: Optional field
- Real-time validation on blur
- Inline error messages with ARIA live regions
- Input sanitization to prevent XSS attacks

### Dark Mode
- Toggle button in navigation
- Preference saved to localStorage
- Smooth transition between themes
- All components styled for both modes

### Accessibility Features
- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Alt text for images
- Reduced motion support for users with motion sensitivity

### Performance
- Lazy loading for images
- Throttled scroll events
- Intersection Observer for animations
- Minimal dependencies (Bootstrap CDN)

## 🎨 Customization

### Colors
Edit CSS variables in `assets/css/styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    /* ... */
}
```

### Content
- Update personal information in `index.html`
- Replace project cards with your own projects
- Add your own profile image to `assets/img/`
- Modify social media links in the footer

## 📝 Form Submission

Currently, the form uses client-side validation only (demo mode). To enable actual form submission:

1. Set up a backend endpoint (Node.js, PHP, etc.)
2. Uncomment the fetch code in `assets/js/main.js`
3. Update the API endpoint URL
4. Handle the response appropriately

Example backend integration is commented in the JavaScript file.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 Credits

- **Bootstrap**: https://getbootstrap.com/
- **Bootstrap Icons**: https://icons.getbootstrap.com/
- **Google Fonts**: https://fonts.google.com/
- **Placeholder Images**: https://via.placeholder.com/

## 📧 Contact

For questions or feedback, please use the contact form on the website or reach out via:
- Email: jaisurya@example.com
- GitHub: https://github.com/jaisurya
- LinkedIn: https://linkedin.com/in/jaisurya

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

**Commit Message Suggestion:**
```
feat: add responsive portfolio layout, projects grid, and contact form validation

- Implement mobile-first responsive design with Bootstrap 5
- Add 6 project cards with detailed modals
- Create contact form with client-side validation
- Implement dark mode with localStorage persistence
- Add smooth scrolling and active nav highlighting
- Include accessibility features (ARIA, keyboard navigation)
- Add scroll animations with Intersection Observer
```

---

Made with ❤️ by Jaisurya
