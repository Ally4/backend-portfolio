import Query from "../models/queries";
import querySchema from "../validation/query";

class Queries {

    async createQuery(req, res) {

        const { error } = querySchema.validate(req.body);
        if (error) {
          return res.status(400).json({
            status: 400,
            message: error.details[0].message.replace(/"/g, ''),
          });
        }

        const query = new Query({
            name: req.body.name,
            email: req.body.email,
            query: req.body.query
        });

        await query.save();
        res.status(200).json({ 
            status: 200, 
            message: "your query have been successfully created", 
            query: query 
        });
    }

}

export default new Queries();
