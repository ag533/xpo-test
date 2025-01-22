# How to Run

1. Clone/download the repository.
2. From the terminal go to the project folder.
3. Run 
```
npm install
```
4. Run
```
npm run dev
```

# Assumptions

1. The admin page is accessable via the home page.
2. We need to show the full descriptions in the cards.
3. We need to only show few fields in the card like name, description, Hall and stand number.

# Technologies used

1. React
2. Redux
3. Material UI
4. Axios
5. Emotion react
6. react-router-dom

# Issues with the APi layer.

1. Not responding to any query apary from name in search API
2. Not responding to grouped query like `?name=ab&hall=B`
3. Response time from the API is a little slow.

# Future Improvements / Missing features

1. Edit functionality for Exhibitors
2. Drag and drop functionaltiy on the admin panel which can change the layout on home page.
3. Saperation on muliple functions in Admin and Home class.
4. Creating more strictly typed functions to avoid garbage values from the API.
5. Error handling on the forms while adding or editing records.
6. Unit tests and end to end tests