export const testPostController = (req, res) => {
  try {
    const { name } = req.body;
    return res.status(200).send(`Your Name Is ${name}`);
  } catch (error) {
    console.error("test post error", error);
    return res.status(500).json({ error: true, message: error.message });
  }
};
