```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

4. En als laatste nog het index.css bestand:
5. Klik op "Add file" > "Create new file"
6. Typ als naam: `frontend/src/index.css`
7. Voeg deze code toe:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```