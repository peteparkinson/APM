# Art Projects Manager

This program is my senior project at DeVry, graduating class September 2020.
It's intended to facilitate record keeping and inventory control for a small arts and crafts business.
Below, there's a list of features, a description for how the program should be used, and a technical explanation of construction.


# General Use

"Projects" are composed of "materials" which can be added to and removed from open projects.  Materials are stock-keeping-units that are tracked by quantity, and also display data such as price, description, etc. Each project can be assigned to a Customer.  Customer data such as name address and phone are tracked.  Projects can be opened as needed and closed if it's been assigned to a customer.  Upon closure, a project will generate an Invoice containing the information relevant to the sale, the customer's information and a user written message to the customer.  

### Creating a Material
Before a material can be added to a project, data about the material must be entered into the system.  This can be done on the "Materials" page:

![material](https://user-images.githubusercontent.com/43157092/95592770-17843d00-0a17-11eb-99f2-4176a899b3b4.jpg)

Now that a material has been created, it can be added to a new, or existing project.
Here's an example of an open project:

![project](https://user-images.githubusercontent.com/43157092/95590120-a8591980-0a13-11eb-9855-6491a4a48e1f.jpg)

Here, projects can be created and deleted.  As a material is added to a project, the stock of that part will decrease.  If on-hand stock reaches 0, the user will be alerted to order more of that part.  

This is a translation of the Art Projects Manager that was written in Java (repository on this account) except this version is in HTML, JS, and CSS. The two should be functionally identical, except the web version will be launched from a browser.

Currently using Node.js for server side with Express framework.

### Proof of Concept

Written in Java using swing, this program served as a demo to the client. 
[Here's the source code for it](https://github.com/peteparkinson/Art-Projects-Manager "GitHub - Art Projects Manager")

![image](https://user-images.githubusercontent.com/43157092/50621709-9b6dd480-0ed5-11e9-8df7-406eeae3f9b3.png)

![image](https://user-images.githubusercontent.com/43157092/50621699-7d07d900-0ed5-11e9-804c-2754106cb3f3.png)
