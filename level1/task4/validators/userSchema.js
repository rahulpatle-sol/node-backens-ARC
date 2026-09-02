import { z } from "zod";

const userSchema = z.object({
    name: z.string().min(2, { message: "Name min 2 chars hona chahiye" }),
    email: z.string().email({ message: "Valid email do" }),
});

export default userSchema;