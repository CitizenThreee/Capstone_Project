**LocalSquare manual testing instructions**
Follow these instructions to manually test elements of the application


**Sign up**

1. Navigate to the sign up page
2. Enter user details and click continue
3. Optionally enter profile details and click continue or skip
4. Enter password and click sign up

The test is successful if the next page is the home page with an empty 
groups container with the title: 'Your Groups:'

If you skip any of the details from the basic info or password steps, 
you shouldn't be able to sign up


**Sign in**

1. Navigate to the sign in page
2. Enter your username and password correctly
3. Click sign in

The test is successful if the next page is the home page with any groups 
the user is a part of

If the email and password aren't correct, the user should see feedback and
not be able to log in


**Find groups**

1. From home page, click on the search bar
2. Scroll down the list of groups, or type in the search bar to narrow the search

The test is successful if all groups show up in the groups container and 
the filter bar appears


**Request to join group**

1. Once you have found a group you want to join, click on the group card
2. Click on the join button in the expanded group card
3. Wait to be accepted into the group

The test is successful if the join button turns to a pending button and
is deactivated

This will only work with groups you are not already a part of, those groups
should have a button that says joined


**Create group**

1. From the home page press the create button
2. Type in a group name
3. Press the create button

The test is successful if the next page is a group page with the name you
entered at the top, and a + button on the tab bar


**Create tab**

1. From the group page press the + button
2. Enter the name of the tab
3. Set the tab settings and permissions
4. Press create

The test is successful if the next page is a tab page with the name you entered


**Delete tab**

1. As an owner, navigate to a group
2. Press the bin icon next to the tab you are on

The test is successful if the next page is the next tab, or nothing if it was the 
only tab in the group and the tab is gone from the tab bar


**Post content**

1. Navigate to a tab you have perms to post content from
2. Fill in the input fields
3. Press send

If you have perms to post freely in the tab, the test is successful if the 
content appears in the tab immediately

If you only have perms to request to post, the test is successful if the 
content appears in the group owner's / admins requests page


**Delete content**

1. Navigate to a tab where you have posted content
2. Press the bin icon on the side of the content

The test is successful if the content dissapears from the tab and doesn't 
re-appear when navigating away from the tab and back


**Accept or reject users**

1. As a new user, request to join the group
2. As an owner or admin of the group, navigate to the requests page
3. Press accept or reject below the request

The test is successful if the user is added to the group and can now access 
the group, or the user's group card in the group search now says join again 
if the request was rejected


**Accept content**

1. As a user, post content in a tab that you don't have perms to post freely
2. As an owner or admin of the group, navigate to the requests page
3. Press accept or reject below the request

The test is successful if the content is posted to the tab if accepted, or gone 
from the requests page, and not posted if rejected


**Edit group**

1. As an owner, navigate to the group settings page
2. Edit the required fields
3. Press save

The test is successful if the next page is the main group page, and the group details
have been changed, this can be verified by going back into the group settings


**Delete group**

1. As an owner, navigate to the group settings page
2. Press delete group

The test is successful if the next page is the home page and the group does not appear
in the list of user groups


**Edit user details**

1. Navigate to the user page
2. Edit the required fields
3. Press save

The test is successful if the next page was the previous page, and the user's details
have been changed, this can be verified by going back into the user settings


**Find other group members**

1. Navigate to the group users page
2. Scroll through the users list to find users
3. Expand the user cards by clicking on them

The test is successful if all the users in a group appear in the group users tab, 
and the cards expand to show more info when clicked


**Messaging in a chat tab**

1. Navigate or create a chat tab in a group
2. Open 2 browsers and go to the same chat tab
3. Send messages from both clients

The test is successful if the messages sent from one client appear immediately in 
the other client's tab