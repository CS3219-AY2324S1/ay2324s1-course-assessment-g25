/**
 * User Controller
 * 
 * This file contains the controller for the User API endpoints.
 * 
 * @module backend/controllers/UserController
 * 
 * @requires backend/data-sources/cloudSQL/Model/UserModel
 */

import sqlConnection from '../data-sources/cloudSQL/connection.js';

const pool = sqlConnection;

pool.connect();

export const getUsers = (req, res) => {
  pool.query('SELECT * FROM public."User" ORDER BY id ASC', (err, results) => {
    if (err) {
      throw err
    }
    res.status(200).json(results.rows)
  })
}

export const createUser = async (req, res) => {
    const { name, email, password, password2 } = req.body

    // check if passwords are equal 
    if (password !== password2) {
        return res.status(400).json({ Error: "Passwords do not match" });
    }

    // check if email has been registered already 
    pool.query(
      'SELECT * from public."User" WHERE email = $1', [email], (err, results) => {
          if (err) {
              throw err
          }
          if (results.rows != 0) {
            res.status(400).json({Error: "Email has been registered already"});
          } else {
            pool.query('INSERT INTO public."User" (name, email, password) VALUES ($1, $2, $3) RETURNING *', 
            [name, email, password], (err, results) => {
              if (err) {
                throw err
            }
            res.status(200).json(results.rows[0])
            })
          }})
}

export const getUserById = async (req, res) => {
    const id = parseInt(req.params.userId)
  
    pool.query('SELECT * FROM public."User" WHERE id = $1', [id], (err, results) => {
      if (err) {
        throw err
      }   
      if (results.rows == 0) {
        res.status(400).json({Error: "User not found"});
      } else {
      res.status(200).json(results.rows[0])
      }})
  }

  export const getUserByEmail = async (req, res) => {
    const email = req.params.email
    console.log("email received", email)
  
    pool.query('SELECT * FROM public."User" WHERE email = $1', [email], (err, results) => {
      if (err) {
        throw err
      }   
      if (results.rows == 0) {
        res.status(400).json({Error: "email User not found"});
      } else {
      console.log("GET user by email result is", results.rows[0])
      res.status(200).json(results.rows[0])
      }})
  }
  
export const updateUser = async (req, res) => {
    const id = parseInt(req.params.userId)
    console.log(req.body)
    const { name, email } = req.body
  
    pool.query(
      'UPDATE public."User" SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id],
      (err, results) => {
        if (err) {
          throw err
        }
        // console.log("User modified with ID: ", id)
        res.status(200).json(results.rows[0])
      }
    )
  }

export const deleteUser = (req, res) => {
    const id = parseInt(req.params.userId)

    pool.query('DELETE FROM public."User" WHERE id = $1 RETURNING *', [id], (err, results) => {
        if (err) {
        throw err
        }
        // console.log("User deleted with ID: ", id)
        res.status(200).json(results.rows[0])
    })
}

// to be deleted after integrating duplicate emails part into createUser
/* export const registerUser = async (req, res) => {
    let { name, email, password, password2 } = req.body;
    console.log({
        name, email, password, password2
    });
    let errors = [];
    pool.query(
        'SELECT * from public."User" WHERE email = $1', [email], (err, results) => {
            if (!err) {
                console.log(results.rows);
            }
            if (results.rows != 0) {
                errors.push({message: "email already registered"});
                res.render('register.ejs', {errors});
                res.end();
            } else {
                pool.query('INSERT INTO public."User"(name, email, password) VALUES ($1, $2, $3) RETURNING id, password', [name, email, password], (err, results) => {
                    if (!err) {
                        console.log(results.rows);
                        errors.push({message: "Registered successfully, please login"});
                        res.render('login.ejs', {errors});
                        res.end();
                    }
                })
            }
        }
    );
    pool.end;
} */
