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
        res.status(201).json({ 
            status: 201, 
            message: "your query have been successfully created", 
            query: query 
        });
    }

    
    async getQuery(req, res) {
      const query = await Query.findOne({ _id: req.params.id });
      if (!query) return res.status(404).json({ 
          status: 404, 
          message: "No query was found" 
      });
      res.status(200).json({ 
          status: 200, 
          query: query 
      });
  }

  async getQueries(req, res) {
    const queries = await Query.find();
    res.status(200).json({ 
        status: 200, 
        queries: queries 
    });
}

async deleteQuery(req, res) {
    const query = await Query.findOne({ _id: req.params.id });
    if (!query) return res.status(404).json({ 
        status: 404, 
        message: "No query was found" });
    await Query.deleteOne({ _id: req.params.id })
    res.status(200).json({ 
        status: 200, 
        message: "The query have been deleted successfully" 
    });
}
}

export default new Queries();
