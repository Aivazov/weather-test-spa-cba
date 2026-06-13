export const card = {
  position: 'relative', // необходимо для абсолютного позиционирования иконки удаления
  width: 220, // Слегка расширили для лучшей вместимости текста
  minHeight: 240,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '24px', // Более скругленные, современные углы
  cursor: 'pointer',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  backgroundColor: 'rgba(20, 20, 25, 0.85)', // Слегка разбавили глубокий черный цвет
  backdropFilter: 'blur(12px)', // Трендовый стеклянный эффект
  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease',
  
  '&:hover': {
    transform: 'translateY(-6px)', // Карточка изящно приподнимается при наведении
    borderColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
    '& .MuiCardActions-root': {
      color: 'primary.light' // Текст "Детальніше" подсвечивается на ховер
    }
  },
};

export const cardContentStyles = {
  padding: '20px 20px 10px 20px',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
};

export const cardMedia = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 60,
  width: 60,
  '& svg': {
    fontSize: '50px !important', // уменьшаем размер иконки, чтобы она аккуратно стояла в ряд с температурой
  }
};

// export const card = {
//   width: 200,
//   display: 'flex',
//   flexDirection: 'column',
//   border: '1px solid #ccc',
//   borderRadius: '20px',
//   cursor: 'pointer',
//   // opacity: 0.85,
//   backgroundColor: 'rgba(0, 0, 0, 0.88)',
// };

// export const cardMedia = {
//   margin: '0 auto',
//   height: 100,
//   width: 130,
//   objectFit: 'contain',
// };
