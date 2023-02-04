const fs = require('fs');
const crypto = require('crypto');

class UsersRepository { 
    constructor(filename) {
        if (!filename) {
            throw new Error('Creating a repository requires a filename');
        }
        this.filename = filename;
        try { 
            fs.accessSynv(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }
    }
    async getAll() {
        //refactoring version:
        return JSON.parse(await fs.promises.readFile(this.filename, {
            encoding: 'utf8'
        }));
        // //Open the file called this.filename
        // const contents = await fs.promises.readFile(this.filename, {
        //     encoding: 'utf8'
        // });
        // //Parse the contents
        // const data = JSON.parse(contents);
        // //Return the parsed data
        // return data;
    }

    async create(attrs) {
        attrs.id = this.randomID();
        const records = await this.getAll();
        records.push(attrs);
        await this.writeAll(records);
    }

    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
    }

    randomID() {
        return crypto.randomBytes(4).toString('hex');
    }
    
    async getOne(id) {
        const records = await this.getAll();
        return records.find(record => record.id === id);
    }

    async delete(id) {
        const records = await this.getAll();
        const filteredRecords = records.filter(record => record.id !== id);
        await this.writeAll(filteredRecords);
    }

    async update(id, attrs) {
        const records = await this.getAll();
        const record = records.find(record => record.id === id);
        
        if (!record) {
            throw new Error(`Record with id ${id} not found`);
        }
        Object.assign(record, attrs);
        await this.writeAll(records);
    }

    async getOneBy() { 
        const records = await this.getAll();

        for (let record of records) {
            let found = true;

            for (let key in filters) {
                if (record[key] != filters[key]) 
                    found = false;
            }
            if (found) return record;
        }
    };
}

 module.exports = new UsersRepository('users.json');