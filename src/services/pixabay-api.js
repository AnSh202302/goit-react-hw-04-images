const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '38692594-46caa16db684ae3e3990f61b0';
export const PER_PAGE = 12;

export const getImg = async (img, page) => {
  const searchParams = new URLSearchParams({
    page: page,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: PER_PAGE,
  });
  const response = await fetch(
    `${BASE_URL}/?q=${img}&key=${API_KEY}&${searchParams}`
  );
  const images = await response.json();
  return images;
};

// const fetchUsers = async () => {
//   const response = await fetch('https://jsonplaceholder.typicode.com/users');
//   const users = await response.json();
//   return users;
// };
