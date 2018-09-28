import {Request, Response, NextFunction} from "express";
import { ContactController } from "../controllers/crmController";
import * as path from 'path';

export class Routes { 
    
    public contactController: ContactController = new ContactController() 
    
    public routes(app): void {   
        app.get('*', (req, res) => res.sendFile(path.join('/home/hocpv/workingdir/node/mini-ecommerce/dist-client', 'index.html')));
        // app.get('/:url', (req, res) => (res.redirect('http://localhost:3001/' + req.params.url)));
        app.route('/api/getUsername')
        .get((req: Request, res: Response) => {            
            res.send({ username: 'os.userInfo().username' });
            // res.status(200).sendFile('../../dist-client/index.html');
        })
        
        // Contact 
        app.route('/contact')
        .get((req: Request, res: Response, next: NextFunction) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);            
            if(req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e'){
                res.status(401).send('You shall not pass!');
            } else {
                next();
            }                        
        }, this.contactController.getContacts)        

        // POST endpoint
        .post(this.contactController.addNewContact);

        // Contact detail
        app.route('/contact/:contactId')
        // get specific contact
        .get(this.contactController.getContactWithID)
        .put(this.contactController.updateContact)
        .delete(this.contactController.deleteContact)

    }
}