export const ARTWORK_INFO = {
  'bazicaluva-landscape-foreground-emphasis.gif': {
    artist: 'Bazicaluva',
    nationality: 'Contemporary',
    title: 'Landscape — Foreground Emphasis',
    date: 'unknown',
    culture: 'Contemporary / Digital'
  },
  'cassatt-loge-intimacy.gif': {
    artist: 'Mary Cassatt',
    nationality: 'American',
    title: 'The Loge [verso]',
    date: 'ca. 1879–1880',
    culture: 'American / French'
  },
  'daumier-reparations-visual-grouping.gif': {
    artist: 'Honoré Daumier',
    nationality: 'French',
    title: 'Reparations / Visual Grouping Study',
    date: '19th century',
    culture: 'French'
  },
  'degas-dancer-atmospheric-energy.gif': {
    artist: 'Edgar Degas',
    nationality: 'French',
    title: 'Dancer with a Fan — Atmospheric Energy Study',
    date: 'ca. 1880s',
    culture: 'French'
  },
  'durer-adam-eve-edge-definition.gif': {
    artist: 'Albrecht Dürer',
    nationality: 'German',
    title: 'Adam and Eve — Edge Definition Study',
    date: '1504',
    culture: 'German / Northern Renaissance'
  },
  'gauguin-tahitian-hair-connection.gif': {
    artist: 'Paul Gauguin',
    nationality: 'French',
    title: 'Tahitian Hair — Connection Study',
    date: 'ca. 1890s',
    culture: 'French / Post-Impressionist'
  },
  'hokusai-woman-baby-line-variation.gif': {
    artist: 'Katsushika Hokusai',
    nationality: 'Japanese',
    title: 'A Woman and Baby — Line Variation Study',
    date: 'ca. 1830s',
    culture: 'Japanese / Ukiyo-e'
  },
  'hollar-muff-material-definition.gif': {
    artist: 'Wenceslaus Hollar',
    nationality: 'Bohemian / English',
    title: 'Muff — Material & Definition Study',
    date: '17th century',
    culture: 'Baroque / Northern European'
  },
  'manet-plainte-moresque-rhythm.gif': {
    artist: 'Édouard Manet',
    nationality: 'French',
    title: 'Plainte Moresque — Rhythm Study',
    date: 'ca. 1870s',
    culture: 'French / Realism'
  },
  'michelangelo-creation-hierarchical-detail.gif': {
    artist: 'Michelangelo Buonarroti',
    nationality: 'Italian',
    title: 'Studies for The Creation of Adam — Hierarchical Detail',
    date: '1511',
    culture: 'Italian / High Renaissance'
  },
  'moronobu-kimono-doubling.gif': {
    artist: 'Hishikawa Moronobu',
    nationality: 'Japanese',
    title: 'Kimono Doubling Study',
    date: 'ca. 1680s',
    culture: 'Japanese / Ukiyo-e'
  },
  'rembrandt-clement-de-jonghe-form.gif': {
    artist: 'Rembrandt',
    nationality: 'Dutch',
    title: 'Clement de Jonghe — Form Study',
    date: 'ca. 1650s',
    culture: 'Dutch / Baroque'
  },
  'rubens-ecce-homo-unified-action.gif': {
    artist: 'Peter Paul Rubens',
    nationality: 'Flemish',
    title: 'Ecce Homo — Unified Action Study',
    date: 'ca. 1610s',
    culture: 'Flemish / Baroque'
  },
  'ruisdael-dune-close-study.gif': {
    artist: 'Jacob van Ruisdael',
    nationality: 'Dutch',
    title: 'Dune — Close Study',
    date: 'ca. 1650s',
    culture: 'Dutch / Golden Age'
  },
  'schiele-herbert-rainer-psychological-line.gif': {
    artist: 'Egon Schiele',
    nationality: 'Austrian',
    title: 'Portrait of Herbert Rainer — Psychological Line Study',
    date: '1918',
    culture: 'Austrian / Expressionist'
  },
  'thayer-head-artist-contrast.gif': {
    artist: 'Abbott H. Thayer',
    nationality: 'American',
    title: "Head of the Artist — Contrast Study",
    date: '1919',
    culture: 'American'
  },
  'van-gogh-weeping-tree-structure.gif': {
    artist: 'Vincent van Gogh',
    nationality: 'Dutch',
    title: 'Weeping Tree — Structure Study',
    date: '1889',
    culture: 'Dutch / Post-Impressionist'
  },
  'ingres-madame-lethiere.gif': {
    artist: 'Jean-Auguste-Dominique Ingres',
    nationality: 'French',
    title: 'Madame Alexandre Lethière',
    date: '1815',
    culture: 'French'
  },
  'seurat-roses-mood.gif': {
    artist: 'Georges Seurat',
    nationality: 'French',
    title: 'Roses in a Vase',
    date: '1881–83',
    culture: 'French / Neo-Impressionist'
  },
  'hugo-octopus-wash.gif': {
    artist: 'Victor Hugo',
    nationality: 'French',
    title: 'Octopus',
    date: '1866–69',
    culture: 'French / Romantic'
  },
  'redon-stepped-gradation.gif': {
    artist: 'Odilon Redon',
    nationality: 'French',
    title: 'Pegasus and Bellerophon',
    date: 'ca. 1888',
    culture: 'French / Symbolist'
  },
  'watson-garrick-stippling.gif': {
    artist: 'Caroline Watson',
    nationality: 'British',
    title: 'Garrick Speaking the Jubilee Ode',
    date: '1784',
    culture: 'British'
  },
  'isabey-smooth-gradation.gif': {
    artist: 'Jean-Baptiste Isabey',
    nationality: 'French',
    title: 'Lady of the Court of Napoléon I',
    date: '1804',
    culture: 'French'
  },
  'anonymous-french-smooth-gradation.gif': {
    artist: 'Anonymous French Artist',
    nationality: 'French',
    title: 'Portrait of a Woman',
    date: '19th century',
    culture: 'French'
  },
  'seurat-stumping.gif': {
    artist: 'Georges Seurat',
    nationality: 'French',
    title: 'Embroidery; The Artist\'s Mother',
    date: '1882–83',
    culture: 'French / Neo-Impressionist'
  }
};

export const getArtworkInfo = (imagePath) => {
  if (!imagePath) return null;
  const filename = imagePath.split('/').pop();
  return ARTWORK_INFO[filename] || null;
};

export const formatArtistName = (artworkInfo) => {
  if (!artworkInfo) return '';
  const { artist, nationality, date } = artworkInfo;
  if (nationality) {
    return `${artist} (${nationality}, ${date})`;
  }
  return `${artist} (${date})`;
};

export const getArtistLastName = (artworkInfo) => {
  if (!artworkInfo || !artworkInfo.artist) return '';
  const artist = artworkInfo.artist.trim();
  const nameParts = artist.split(' ');
  if (nameParts.length <= 1) {
    return nameParts[0];
  }
  // Handle common name prefixes that should be included with the last name
  const prefixes = ['van', 'de', 'da', 'del', 'della', 'von', 'du', 'le', 'la', 'el', 'al'];
  const lastName = nameParts[nameParts.length - 1];
  // Check if there's a prefix before the last name
  if (nameParts.length >= 2) {
    const secondToLast = nameParts[nameParts.length - 2].toLowerCase();
    if (prefixes.includes(secondToLast)) {
      // Include the prefix with the last name (e.g., "van Gogh", "de Jonghe")
      return `${nameParts[nameParts.length - 2]} ${lastName}`;
    }
  }
  // For compound names like "Jean-Baptiste" or hyphenated surnames
  if (lastName.includes('-') || nameParts.length >= 3) {
    // Check for double prefixes (e.g., "van der", "de la")
    if (nameParts.length >= 3) {
      const thirdToLast = nameParts[nameParts.length - 3].toLowerCase();
      const secondToLast = nameParts[nameParts.length - 2].toLowerCase();
      if (prefixes.includes(thirdToLast) && (prefixes.includes(secondToLast) || secondToLast === 'der' || secondToLast === 'las')) {
        return `${nameParts[nameParts.length - 3]} ${nameParts[nameParts.length - 2]} ${lastName}`;
      }
    }
  }
  return lastName;
};

export const loadArtworkData = async (imagePath) => {
  if (!imagePath) return null;
  try {
    // Extract the base filename without extension from the image path
    const filename = imagePath.split('/').pop().split('.')[0];
    // Construct the JSON file path
    const jsonPath = `/${filename}.json`;
    const response = await fetch(jsonPath);
    if (!response.ok) {
      console.warn(`No artwork data found for: ${filename}`);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading artwork data:', error);
    return null;
  }
};
