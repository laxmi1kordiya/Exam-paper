export const findData = (formData, allData, type) => {
  if (!formData) return null;
  const board = allData.find((board) => board.name === formData.board);
  if (!board || !Array.isArray(board.standards)) return null;
  let data = {};
  if (type === "standard") {
    data = board.standards.find(
      (standard) => standard._id === formData.standard
    );
  } else if (type === "subject") {
    data = board.subjects.find((subject) => subject._id === formData.subject);
  }
  return data ? data.name : null;
};

export const generateObjectId = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const random = "xxxxxxxxxxxxxxxx".replace(/x/g, () =>
    Math.floor(Math.random() * 16).toString(16)
  );
  return timestamp + random;
};
