---

## ✅ `TASKS.md` (Daily Direction)

```md
# Task Management

> **Guiding Principles:**  
> **1. Service Layer with Separation of Concerns:**  
> - All business logic must reside in service classes/modules, not in controllers or routes.  
> - Controllers/routes should only handle HTTP request/response and delegate to services.  
> - This ensures maintainability, testability, and clear boundaries between layers.
>
> **2. OpenAPI as Source of Truth:**  
> - The `openapi.yaml` file defines the contract for all API endpoints, request/response shapes, and error handling.
> - All backend and frontend code must strictly adhere to the OpenAPI spec.
> - Any change to the API must be reflected in `openapi.yaml` first, before implementation.
> - Use the OpenAPI spec to auto-generate types, docs, and client/server stubs where possible.
> - Treat OpenAPI as the single source of truth for API design, validation, and documentation.
>
> **Think of OpenAPI as:**  
> - The blueprint for your API: if it’s not in OpenAPI, it doesn’t exist.
> - The contract between backend, frontend, and external consumers.
> - The foundation for automated testing, code generation, and documentation.

## 🔥 Immediate Focus
- [ ] 
- [ ]  
- [ ]

## 🚧 In Progress
- [ ] create endpoint to allow users apply for admission(Programme Level
,Programme of Choice,Two (2) Recent Passport-Sized Photographs,Surname,Firstname,Title,Other Names,Date of Birth,Place of Birth,Gender,Present Residential Address,Email Address,Phone Number,Permanent Home Address (No P.O. Box),Postal Address,Nationality,Native Language,Is Place of Birth Different from Nationality?,Marital Status, Religion,Denomination,Name and Address of Parent/Guardian,Emergency Contact
 Name and Address,Phone Number, Next of Kin
Name and Address Phone Number Educational Qualifications
Please list all institutions attended, beginning with the most recent Institution Name, From dd/mm/yyyy To, Qualification / Certificate Obtained Professional Certificates (if any) Upload Certificates,Description (optional) Financial and Health Information How do you intend to finance your studies? *,Do you have any special needs or health condition? *, Please provide details of two referees (one academic and one clergy)Academic Referee Full Name *, Profession *, Institution / Organization *,Address *,Phone Number *, Email Address *,2. Clergy Referee Full Name *,Position * Church / Ministry *,Address *, Phone Number *, Email Address *, Declaration Applicant’s Signature * enter full name, Date *
)
- [ ] 
- [ ] 

## 📌 Backlog
- [ ] 

## ✅ Completed

- [x] Create endpoint for auth
- [x] Create an error class for error middleware so i can pass it to next
- [x] create a news endpoint with Title Summary, Category and Message Body(delete edit view) admin
- [x]create an event endpoint with Title, Date, location and Description(delete edit and view) for admin
- [x] handle cors for this system 
- [x]create endpoint for admin to view testimony approve or delete filter by pending and approved 
- [x]create endpoint for users to share testimony name,contact email, testimony and photo without auth(save the photo in upload folder then url to db and handle the folder to be public  )
- [x] setup a build to init ang generate prisma for cPanel and mysql environment for build command 
- [x] create endpoint for admin to view approve reject delete admission request

```

