# WEB103 Project 4 - DriftDrive

Submitted by: **Shivesh Gupta**

About this web app: **DriftDrive is a custom car builder that lets users configure a car, preview the build, calculate the total price, save it to a PostgreSQL database, and manage saved builds through list, detail, edit, and delete views.**

Time spent: **7 hours**

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.**
- [x] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
- [x] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command `SELECT * FROM cars;` to display your table contents.**
- [x] **Users can view multiple features of the `CustomItem` (car) they can customize, such as model, paint, wheels, interior, and package.**
- [x] **Each customizable feature has multiple options to choose from.**
- [x] **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.**
- [x] **The price of the `CustomItem` changes dynamically as different options are selected.**
- [x] **The visual interface changes in response to at least one customizable feature.**
- [x] **The user can submit their choices to save the item to the list of created `CustomItem`s.**
- [x] **If a user submits a feature combo that is impossible, they receive an appropriate error message and the item is not saved to the database.**
- [x] **Users can view a list of all submitted `CustomItem`s.**
- [x] **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can delete submitted `CustomItem`s from the list view of submitted `CustomItem`s.**
- [x] **Users can update or delete `CustomItem`s that have been created from the detail page.**

The following **optional** features are implemented:

- [x] Selecting particular options prevents incompatible options from being submitted by disabling the create/update button for invalid configurations

The following **additional** features are implemented:

- [x] Clean garage page with a responsive grid of saved builds
- [x] Dedicated details page with a large preview and one-row-per-detail summary layout
- [x] Shared utility modules for validation, pricing, and car option metadata
- [x] Reset script to recreate the `cars` table schema quickly during development

## How to Run

1. Install dependencies:

```bash
npm install
```

2. Make sure your `server/.env` file contains valid PostgreSQL credentials.

3. Create or reset the table:

```bash
npm run reset
```

4. Start the app:

```bash
npm run dev
```

## Database Schema

The app currently uses a `cars` table with these columns:

- `id`
- `name`
- `model`
- `paint`
- `wheels`
- `interior`
- `package`
- `notes`
- `price`
- `summary`

## Video Walkthrough

Here's a walkthrough of implemented required features:

**Add your GIF or video link here**

## Notes

- One key challenge was making sure the frontend feature selections matched the backend table structure and API payloads.
- Another was validating impossible car configurations while still keeping the create/edit flow smooth for the user.
- The README still needs the final walkthrough assets showing the Render database dashboard and the `SELECT * FROM cars;` output.

## License

Copyright 2026 Shivesh Gupta

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
