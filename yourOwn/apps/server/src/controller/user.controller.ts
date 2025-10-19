
const { z } = require('zod');

// Example controller function
 const createUser = async (req, res) => {
  const schema = z.object({
    email: z.string().email(),
    name: z.string().min(1)
  });

  const parse = schema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() });
  }

  // TODO: persist user
  res.status(201).json({ user: parse.data });
};

module.exports = {
    createUser
}