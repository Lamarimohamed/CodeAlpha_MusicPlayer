# NeonPulse - Futuristic Music Player

A unique, modern, and fully responsive music player built with vanilla HTML, CSS, and JavaScript. Features a futuristic glassmorphism design with neon accents and smooth animations.

## 🎵 Features

### Core Music Controls
- **Play/Pause** functionality with animated button
- **Next/Previous** song navigation
- **Progress bar** with real-time updates and seeking capability
- **Volume control** with slider and mute/unmute toggle

### Song Information
- Dynamic display of song title, artist, and duration
- Real-time progress time updates
- Beautiful album cover display with hover effects

### Playlist & Autoplay
- **5 sample songs** with unique generated album covers
- **Autoplay** - automatically plays next song when current one ends
- **Clickable playlist** - click any song to play it immediately
- **Active song highlighting** in the playlist

### Unique Design Features
- **Glassmorphism** effect with backdrop blur and transparency
- **Neon color scheme** with purple and cyan gradients
- **Rotating background animation** for dynamic visual appeal
- **Smooth hover effects** and transitions throughout
- **Responsive design** that works on all device sizes

### Keyboard Shortcuts
- **Spacebar** - Play/Pause
- **Left Arrow** - Previous song
- **Right Arrow** - Next song
- **Up Arrow** - Increase volume
- **Down Arrow** - Decrease volume
- **M** - Mute/Unmute
  
### Installation
1. Download all three files to the same folder:
   - `index.html`
   - `styles.css`
   - `script.js`

2. Open `index.html` in your web browser

That's it! The music player will load automatically with 5 sample songs.

## 📁 File Structure

```
CodeAlpha_MusicPlayer/
├── index.html          # Main HTML structure
├── styles.css          # All CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎨 Design Philosophy

The design combines several modern UI trends:
- **Glassmorphism**: Semi-transparent elements with backdrop blur
- **Neumorphism**: Subtle shadows and depth
- **Neon aesthetics**: Bright, vibrant colors for a futuristic feel
- **Smooth animations**: CSS transitions and keyframe animations

## 🔧 Customization

### Adding Your Own Songs
To add your own music, edit the `playlist` array in `script.js`:

```javascript
{
    title: "Your Song Title",
    artist: "Your Artist Name",
    cover: "path/to/your/cover.jpg",
    duration: "3:45",
    audioUrl: "path/to/your/audio.mp3"
}
```

### Changing Colors
Modify the CSS variables in `styles.css` to change the color scheme:

```css
/* Main gradient colors */
background: linear-gradient(90deg, #8a2be2, #40e0d0);

/* Background gradient */
background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
```

## 🌐 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 📱 Responsive Design

The player automatically adapts to different screen sizes:
- **Desktop**: Full-size player with 250px album covers
- **Tablet**: Medium-size player with 200px album covers
- **Mobile**: Compact player with 180px album covers

## 🎯 Technical Details

- **Vanilla JavaScript**: No frameworks or libraries required
- **ES6 Classes**: Modern JavaScript with class-based architecture
- **CSS Grid/Flexbox**: Modern layout techniques
- **CSS Animations**: Smooth transitions and keyframe animations
- **HTML5 Audio API**: Native browser audio support

## 🤝 Contributing

Feel free to modify and improve this music player! Some ideas for enhancements:
- Add more audio formats support
- Implement shuffle and repeat modes
- Add equalizer functionality
- Create themes system
- Add playlist import/export

## 📄 License

This project is open source and available under the MIT License.

---

**Enjoy your futuristic music experience! 🎵✨**
