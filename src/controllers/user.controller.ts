import { Request, Response } from "express";
import db from "../database/prisma.connection";

class ClassroomController {
  public async list(req: Request, res: Response) {
    try {
      const users = await db.users.findMany();

      return res
        .status(200)
        .json({ success: true, msg: "List users.", data: users });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "ERROR Database." });
    }
  }

  public async create(req: Request, res: Response) {
    const { student, password } = req.body;

    if (!student || !password) {
      return res.status(400).json({ success: true, msg: "Required fields." });
    }

    try {
      const studentFind = await db.students.findUnique({
        where: { id: student },
      });

      if (!studentFind) {
        return res
          .status(400)
          .json({ success: true, msg: "Student not found." });
      }
      const newUser = await db.users.create({
        data: { password, studentId: student },
      });

      return res
        .status(200)
        .json({ success: true, msg: "Create new user.", data: newUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "ERROR Database." });
    }
  }
}

export default ClassroomController;
