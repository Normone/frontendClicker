// const Path = '/frontendClicker';
// const Path = '';
const Path = process.env.NODE_ENV === 'production' ? '/frontendClicker' : ''
export const basePath = Path;