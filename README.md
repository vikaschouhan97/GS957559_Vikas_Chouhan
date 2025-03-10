# Data Viewer Application

This project is for viewing datas across multiple Stores and SKUs
![alt text](image.png)

## Getting Started

Follow these steps to set up and run the application:

### 1. Install dependencies
```sh
npm install
```

### 2. Start the development server
```sh
npm run dev
```

This will start the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Login Credentials

To log in, use the following credentials:

**Email:** `john@mail.com`

**Password:** `John@123`

## Running Tests

To run tests, use the following command:
```sh
npm run test
```

## CI/CD Pipeline

You can check the commits through the ci/cd pipeline of github inside the Actions tab. The pipeline consist of following actions -

- npm run install // To install all the dependencies
- npm run test // To test the testcases written for component
- npm run build // To build the application

### **Worksheet Names and Column Order**

1. **Stores** - `Seq No.`, `ID`, `Label`, `City`, `State`
2. **SKUs** - `ID`, `Label`, `Class`, `Department`, `Price`, `Cost`
3. **Calendar** - `Seq No.`, `Week`, `Week Label`, `Month`, `Month Label`
4. **Planning** - `Store`, `SKU`, `Week`, `Sales Units`

Please ensure that your file follows this structure before uploading to avoid errors.

## Challenges and Learning Experience

During this project, I encountered several challenges that helped me grow and refine my skills:

- The biggest challenge I faced was creating tables using Excel sheets, as I was not familiar with it. However, I had a great adventure working through this problem and improving my proficiency.
- Working with the **AG Grid** library was a completely new experience for me. It took a considerable amount of time to understand its functionality, but in the end, I was able to implement it successfully.
- The **planning and chart** part of the project was the most demanding task, as it required combining multiple sheets and performing complex calculations. Despite the difficulties, I managed to overcome these challenges through perseverance and problem-solving skills.

I hope you will like this project and appreciate the effort and dedication that went into building it.

## If I had 4 more hours then

- I will write more test cases for different components.
- Write common functions for reading and storing data of excel files.
- Making user authentication dynamic and adding OAuth logins with it.


