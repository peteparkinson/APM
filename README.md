# Art Projects Manager

This program's intendeduse is to facilitate record keeping and inventory control for a small arts and crafts business.
Below, there's a list of features, a description for how the program should be used, and a technical explanation of construction.


## Features

* Track Inventory Levels and Usage
* Calculate Costs / Profits
* Generate reports
* Track Customer Data
* Create Invoices

## General Use

"Projects" are composed of "materials" which can be added to and removed from open projects.  Materials are stock-keeping-units that are tracked by quantity, and also contain data such as price, description, etc. Each project can be assigned to a Customer.  Customer data such as name address and phone are tracked.  Projects can be opened as needed and closed if it's been assigned to a customer.  Upon closure, a project will generate an Invoice containing the information relevant to the sale, the customer's information and a user written message to the customer.  

### Creating a Material
Before a material can be added to a project, data about the material must be entered into the system.  
This can be done on the "Manage Materials" page:

![material](https://user-images.githubusercontent.com/43157092/95593179-5b774200-0a17-11eb-808e-2ddc94e05667.jpg)

### Creating a Project

Now that a material has been created, it can be added to a new, or existing project.
On the "Edit Projects" page, projects can be created and deleted.  As a material is added to a project, the stock of that part will decrease.  If on-hand stock reaches 0, the user will be alerted to order more of that part.  
Here's an example of an open project:

![project](https://user-images.githubusercontent.com/43157092/95590120-a8591980-0a13-11eb-9855-6491a4a48e1f.jpg)

### Viewing costs and charge data

On the "View Projects" page, the user can look at the prices associated with the project.  All the these figures are auto-generated using an assumed hourly rate predetermined by the user. This data can be overwritten by the user.

![view-project](https://user-images.githubusercontent.com/43157092/95593607-e8ba9680-0a17-11eb-9286-51aa1a8de75f.jpg)

### Invoicing

Once a project is closed, it will appear on the "Invoice" page, where the data can be verified, and the invoice can be generated, then printed.  

![invoice](https://user-images.githubusercontent.com/43157092/95598292-bdd34100-0a1d-11eb-9e1f-63ed03c0c622.jpg)


# Technical Aspects
## Node JS

The server is written in Node JS using Express framework, with 8 views and routes.  The database is kept locally as 3 JSON files, 1 for each object (projects, materials, customers).

Here's a flowchart of the file structure:

![Untitled](https://user-images.githubusercontent.com/43157092/95609228-64264300-0a2c-11eb-8ba3-380fa027e156.jpg)


## Proof of Concept

Written in Java using swing, this program served as a demo to the client. 
[Here's the source code for it](https://github.com/peteparkinson/Art-Projects-Manager "GitHub - Art Projects Manager")

![image](https://user-images.githubusercontent.com/43157092/50621709-9b6dd480-0ed5-11e9-8df7-406eeae3f9b3.png)

![image](https://user-images.githubusercontent.com/43157092/50621699-7d07d900-0ed5-11e9-804c-2754106cb3f3.png)
