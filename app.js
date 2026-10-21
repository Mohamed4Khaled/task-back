const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let people = [];

// 1. Function to enter data for 10 people
function addPeople(count = 10) {
  if (people.length >= 10) {
    console.log("You already have 10 people in the list!");
    showMenu();
    return;
  }

  console.log(`\nEnter data for person #${people.length + 1}:`);
  
  rl.question('ID: ', (id) => {
    rl.question('First Name: ', (firstName) => {
      rl.question('Last Name: ', (lastName) => {
        rl.question('Age: ', (age) => {
          rl.question('City: ', (city) => {
            
            // Push the person object into the array
            people.push({ id, firstName, lastName, age, city });
            
            if (people.length < count) {
              addPeople(count); // Ask again until we hit 10
            } else {
              console.log("\nAll 10 people added successfully!");
              showMenu();
            }
          });
        });
      });
    });
  });
}

// 2. View data (all or specific)
function viewData() {
  if (people.length === 0) {
    console.log("\nNo people found! Please add data first.");
    showMenu();
    return;
  }

  rl.question('\nDo you want to view (1) All people or (2) A specific person? Enter 1 or 2: ', (choice) => {
    if (choice === '1') {
      console.log("\n--- All People ---");
      console.log(people);
      showMenu();
    } else if (choice === '2') {
      rl.question('Enter the ID of the person: ', (searchId) => {
        let person = people.find(p => p.id === searchId);
        if (person) {
          console.log("\n--- Person Found ---");
          console.log(person);
        } else {
          console.log("\nPerson not found.");
        }
        showMenu();
      });
    } else {
      console.log("Invalid choice.");
      showMenu();
    }
  });
}

// 3. Delete data (all or specific)
function deleteData() {
  if (people.length === 0) {
    console.log("\nNo data to delete.");
    showMenu();
    return;
  }

  rl.question('\nDo you want to delete (1) All people or (2) A specific person? Enter 1 or 2: ', (choice) => {
    if (choice === '1') {
      people = [];
      console.log("\nAll people deleted.");
      showMenu();
    } else if (choice === '2') {
      rl.question('Enter the ID of the person to delete: ', (searchId) => {
        let index = people.findIndex(p => p.id === searchId);
        if (index !== -1) {
          people.splice(index, 1);
          console.log(`\nPerson with ID ${searchId} deleted.`);
        } else {
          console.log("\nPerson not found.");
        }
        showMenu();
      });
    } else {
      console.log("Invalid choice.");
      showMenu();
    }
  });
}

// 4. View full name and city
function viewNamesAndCities() {
  if (people.length === 0) {
    console.log("\nNo records found.");
    showMenu();
    return;
  }

  console.log("\n--- Full Names and Cities ---");
  people.forEach((p, i) => {
    console.log(`${i + 1}. Name: ${p.firstName} ${p.lastName} | City: ${p.city}`);
  });
  showMenu();
}

// Main Menu
function showMenu() {
  console.log("\n--- MENU ---");
  console.log("1. Enter 10 people");
  console.log("2. View people");
  console.log("3. Delete people");
  console.log("4. View Full Name and City");
  console.log("5. Exit");

  rl.question('\nChoose an option (1-5): ', (option) => {
    switch (option.trim()) {
      case '1':
        addPeople();
        break;
      case '2':
        viewData();
        break;
      case '3':
        deleteData();
        break;
      case '4':
        viewNamesAndCities();
        break;
      case '5':
        console.log("Goodbye!");
        rl.close();
        break;
      default:
        console.log("Invalid option, try again.");
        showMenu();
        break;
    }
  });
}

// Start the program
showMenu();



















