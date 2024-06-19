import { useMutation } from "@apollo/client";

import { IoBookmarkOutline } from "react-icons/io5";

import { Header } from "components";
import { useHeaderItems } from "hooks";
import { useAuthenticationStore } from "store";
import { GET_USER_BY_ID, UNSAVE_POST, UnsavePostData } from "helpers";

import { Button, Container, Sidebar, Text } from "./SavedPage.style";

export function SavedPage() {
  const { authenticatedUser } = useAuthenticationStore();
  const [unsavePost] = useMutation<UnsavePostData>(UNSAVE_POST);
  const headerItems = useHeaderItems();

  return (
    <Container.Main>
      <Header items={headerItems} selectedItem={null} />
      <Container.Content>
        {/* TO BE ADDED */}
        {/* <Sidebar>
          <p>Saved</p>
        </Sidebar> */}
        <Container.SavedPosts.Outer>
          <div>
            <h3>All</h3>
          </div>
          <Container.SavedPosts.Inner>
            {authenticatedUser?.savedPosts.map(
              ({
                id,
                owner: { firstName: ownerFirstName, lastName: ownerLastName },
                text,
              }) => {
                return (
                  <Container.SavedPost.Main key={id}>
                    {/* TO BE ADDED */}
                    {/* <img alt={text || ""} /> */}
                    <Container.SavedPost.Details>
                      <div>
                        <Text.SavedPost.Text>{text}</Text.SavedPost.Text>
                        <p>
                          {ownerFirstName} {ownerLastName}
                        </p>
                      </div>
                      <Button.UnsavePost
                        onClick={() => {
                          unsavePost({
                            variables: {
                              input: {
                                postId: id,
                                userId: authenticatedUser?.id,
                              },
                            },
                            refetchQueries: [
                              {
                                query: GET_USER_BY_ID,
                                variables: {
                                  input: {
                                    authenticatedUserId: authenticatedUser?.id,
                                    returnUserIfBlocked: true,
                                    userId: authenticatedUser?.id,
                                  },
                                },
                              },
                            ],
                          });
                        }}
                      >
                        <IoBookmarkOutline /> Unsave
                      </Button.UnsavePost>
                    </Container.SavedPost.Details>
                  </Container.SavedPost.Main>
                );
              }
            )}
          </Container.SavedPosts.Inner>
        </Container.SavedPosts.Outer>
      </Container.Content>
    </Container.Main>
  );
}
