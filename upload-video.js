const cloudinary = require('cloudinary').v2;

// Configura Cloudinary (usa credenziali demo per test)
cloudinary.config({
  cloud_name: 'demo',
  api_key: 'demo',
  api_secret: 'demo'
});

// Carica il video
cloudinary.uploader.upload('public/videos/islanda.mp4', {
  resource_type: 'video',
  folder: 'briele-website'
}, (error, result) => {
  if (error) {
    console.error('Errore nel caricamento:', error);
  } else {
    console.log('Video caricato con successo!');
    console.log('URL del video:', result.secure_url);
  }
}); 