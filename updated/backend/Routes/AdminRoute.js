import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";
import axios from 'axios'
const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
        return res.json({ loginStatus: false, Error:"wrong email or password" });
    }
  });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

// image upload 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
// end image upload 

router.post('/add_employee',upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee 
    (name,email,password, address, salary,image, category_id, dateOfBirth, phoneNumber, gender, bankAccountNumber, pfund, loan) 
    VALUES (?)`;
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {//here the bcypt for password is used
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary, 
            req.file.filename,
            req.body.category_id,
            req.body.dateOfBirth,
            req.body.phoneNumber,
            req.body.gender,
            req.body.bankAccountNumber,
            req.body.pfund,
            req.body.loan
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee 
        set name = ?, email = ?, salary = ?, address = ?, category_id = ?, dateOfBirth = ?, phoneNumber = ?, gender = ?, bankAccountNumber = ?, pfund = ?, loan = ? 
        Where id = ?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id,
        req.body.dateOfBirth,
        req.body.phoneNumber,
        req.body.gender,
        req.body.bankAccountNumber,
        req.body.pfund,
        req.body.loan,
        id
    ]
    con.query(sql,[...values], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_employee/:id', (req, res) => { 
    const id = req.params.id;
   
    const sql = "delete from employee where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salaryOFEmp from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_payment',upload.single('image'), (req, res) => {
    const sql = `INSERT INTO payment 
    (totalPay, year, month, houseAllowance, loanCut, seasonalBonus, absence, pfundCut, payid, employeeid, overtime, medicalAllowance, otherBonus) 
    VALUES (?)`;
    const values = [
        req.body.totalPay,
        req.body.year,
        req.body.month,
        req.body.houseAllowance,
        req.body.loanCut,
        req.body.seasonalBonus,
        req.body.absence,
        req.body.pfundCut,
        req.body.payid,
        req.body.employeeid,
        req.body.overtime,
        req.body.medicalAllowance,
        req.body.otherBonus
    ]
    con.query(sql, [values], (err, result) => {
        if

(err) return res.json({Status: false, Error: err})
        return res.json({Status: true})
    })
})

router.get('/payment', (req, res) => {
    const sql = "SELECT * FROM payment";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/payment/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM payment WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_payment/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE payment 
        set totalPay = ?, year = ?, month = ?, houseAllowance = ?, loanCut = ?, seasonalBonus = ?, absence = ?, pfundCut = ?, payid = ?, employeeid = ?, overtime = ?, medicalAllowance = ?, otherBonus = ? 
        Where id = ?`
    const values = [
        req.body.totalPay,
        req.body.year,
        req.body.month,
        req.body.houseAllowance,
        req.body.loanCut,
        req.body.seasonalBonus,
        req.body.absence,
        req.body.pfundCut,
        req.body.payid,
        req.body.employeeid,
        req.body.overtime,
        req.body.medicalAllowance,
        req.body.otherBonus,
        id
    ]
    con.query(sql,[...values], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_payment/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    const sql = "delete from payment where payid = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/payment_count', (req, res) => {
    const sql = "select count(id) as payment from payment";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_records', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get("/payments", (req, res) => {
    const sql = "SELECT * FROM payment";
    con.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ Error: "Error in executing query" });
        }
        return res.status(200).json({ Status: "Success", Result: result });
    });
});


router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

//new
// adminRouter.js


router.get('/predict', (req, res) => {
    const sql = "SELECT p.employeeid, p.absence, p.overtime, p.totalPay, e.name FROM payment p INNER JOIN employee e ON p.employeeid = e.id";

    con.query(sql, async (err, result) => {
        if (err) {
            return res.status(500).json({ Error: "Error in executing query" });
        }
        
        try {
            const predictionResponse = await axios.post('http://127.0.0.1:5000/predict', {//posting the retrieved data from database to the flask
                data: result
            });

            console.log('Data from flasK: ', predictionResponse.data)
//here the sql query retrieves the parameters and stored in the result , that is sent as a post request to the flask server , which has created a route handler to post, takes the data and returns the array of the predictoins in a json file to the post reques of the AdminRoute , then from there the predictions are passed to the get request of the predict.jsx , this is the example of nested requests           
            // Assuming the Flask server returns predictions in the 'predictions' field
            const predictions = predictionResponse.data.predictions;

            return res.status(200).json({ Status: "Success", Predictions: predictions });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ Error: error });
        }
    });
});




export { router as adminRouter };