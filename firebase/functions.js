import { fetchErrands, messagesRef } from "./config.js";

export function getInitials(fname, lname) {
  const initials = (fname[0] + lname[0]).toUpperCase();
  return initials;
}

export function createMessageAndAddIdToExistingErrands() {
  return fetchErrands().then((errands) => {
    messageDetails = {
      chippers: [
        { userID: "1UlM7MeNhbQbIKXaek321vvntiG3", username: "Greeners" },
      ],
      errandOwner: { id: "wTrVeuolohSxnFSXY2p312E6aEg1", user: "Janash" },
      body: [
        {
          message: "Hi there, please bring muscles",
          msgAuthor: "Greeners",
          timestamp: "August 17, 2022 at 10:40:22 AM UTC+1",
        },
      ],
      errandID: "2fyYaQe11AOYCjvNvH42",
    };

    return addDoc(messagesRef, messageDetails)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
}
