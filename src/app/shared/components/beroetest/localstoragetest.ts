// Define a user type
type User = {
  firstName: string;
  lastName: string;
  age: number;
};

// Create a user object
const user: User = {
  firstName: "John",
  lastName: "Smith",
  age: 30
};

// Store the object in localStorage as a JSON string
localStorage.setItem("user", JSON.stringify(user));

// Retrieve and parse it back to a User object
const storedUserString = localStorage.getItem("user");

if (storedUserString) {
  const storedUser: User = JSON.parse(storedUserString);

  // Safely update the DOM
  const demoElement = document.getElementById("demo");
  if (demoElement) {
    demoElement.innerHTML = 
      `Name: ${storedUser.firstName} ${storedUser.lastName}, Age: ${storedUser.age}`;
  }
}
