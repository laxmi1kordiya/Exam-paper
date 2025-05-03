
  export const findData = (formData,allData, type) => {
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