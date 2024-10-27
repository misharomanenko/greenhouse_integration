# Comprehensive Documentation for [globals.css](./globals.css)

The [`globals.css`](./globals.css) file, located in the `styles` directory, serves as a comprehensive hub for all global styles and variables utilized throughout the KP Sponsor Website. It is meticulously structured to ensure an intuitive user experience and efficient navigation.

## Structure of the Styles

The [`globals.css`](./globals.css) file is organized in a user-friendly manner to facilitate easy access and comprehension. Here's a detailed breakdown of its structure:

- **Tailwind Directives**: The file initiates with Tailwind CSS directives for base, components, and utilities. These directives, integral to the Tailwind CSS framework, inject Tailwind's styles into your CSS. They are essential for the functioning of the Tailwind CSS framework within the project.

- **Global Variables**: This segment defines CSS custom properties (variables) that are globally used across the website. These variables encompass colors, border radius, transition, and box shadow. Two sets of variables are defined, one for the light theme and another for the dark theme. These variables are used throughout the website to maintain consistency in design and ease of modification.

- **Base Styles**: This segment outlines the base styles for the website, including the body and typography styles. These styles are applied globally and form the foundation of the website's design.

- **Links**: This segment specifies the styles for all the links present on the website. It includes color, transition, and text-decoration properties to ensure a consistent and user-friendly experience across all links.

- **Buttons**: This segment details the styles for all the buttons on the website, including the styles for button hover and focus states. It defines properties such as background-color, color, border, border-radius, padding, font-weight, text-align, transition, and cursor.

- **Responsive Design**: This segment includes media queries for responsive design. The styles within this section are applied when the viewport is 768px or less. It ensures the website is mobile-friendly and provides a consistent user experience across various device sizes.

## Guidelines for Modifying Styles

Modifications to the styles and variables in this file are permissible as required, but bear in mind that changes will have a global impact on the entire website. Therefore, it is crucial to thoroughly test your changes to ensure they do not disrupt the layout or design of the website. Always consider the potential impact on both the light and dark themes, as well as on various device sizes due to the responsive design.
