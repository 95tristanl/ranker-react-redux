# ranker
Simple react app that allows people to rank submitted content
To the app out try using a mongo container from Kitematic and setting the appropriate port. 

4 pages: Home, Submit, Vote, Chart

Home page is the entry page. You can register or log in when you are logged out, and when you are logged in the home page becomes your profile with your credentials and all the content you submitted and the option to log out.

Can submit content in Submit page.

Can bring up content to vote on in Vote Page. Before you vote it will only show the content.
After you vote the submitter's handle and the amount of up and down votes will be shown. For
each vote you cast, you can see one more ranked content item in the Chart Page. If the report
vote reaches 5 votes, the content item (db schema) is deleted from the DB. The Vote Page does not
save state entirely. If you come back to it without leaving the app itself, it will not bring
up content you have already voted on, but previous content you have already voted on will not
be shown as it was after you had cast your vote. It will also not bring up content that you submitted.

Chart Page displays 5 most upvoted content items from the DB. As you vote on content in the
Vote Page, the Chart Page will display more content items.

You are logged out when you leave the app since state does not persist in a session/token.
