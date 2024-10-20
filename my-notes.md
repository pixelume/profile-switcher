## General Code Improvements

- [x] Get rid of fetches in useEffect. Use React Query
- [x] Replace BrowserRouter with createBrowserRouter. Why? What is the benefit of this? See https://reactrouter.com/en/main/routers/picking-a-router
- [x] Fix rest server
- [x] Fix graphql server
- [x] Fix tsconfig setup
- [x] Fix dark mode
- [x] Fix basic styling issues
- [x] Interpolation of part of TW utility classes wont work. See AppContext.tsx -> renderComponent() line 42
- [x] Create additional routes in the /app/{page}
- [x] Change sidebar content te be different in /admin and /app
- [x] Add env variables for REST and Gql servers
- [x] Create/Mofify GQL schema for UI components
- [x] Create schema for iterations data
- [x] Separate mock data from ui data
- [x] Seperate UI schema from data schema
- [x] Restructure code and break into smaller components for better legibility
- [x] Create a reusable searchable DataTable component that can work with different data schema's
- [x] Create mutations to add, edit and delete entries in the iterations table
- [x] Create mutations to add and remove components to a page on the App profile
- [x] Allow users to add a DataTable component with iterations data to a page on the App profile
- [x] Use Tabler Icons
- [x] Redo Main Layout to be a bit more contemporary and responsive with side navigation pushing content out

## Thoughts on structural improvements:

- [ ] Can we somehow strictly define the types for the component props (currently any)?
- [ ] Tried to make the components more typesafe, but without knowing the type of the props it's very difficult.
- [ ] If we go the route of adding TW classes based on props, consider using CVA. This is already included as dependency as ShadCn components make use of it
- [ ] How important is responsive layout? Is the web app used on mobile devices?

## Nice to have styling improvements

- [ ] Center content in main content area
- [ ] Use Shadcn ScrollArea for a nicer scrollbar which doesn't shift the content
