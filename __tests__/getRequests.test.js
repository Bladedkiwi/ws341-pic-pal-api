const mockingoose = require('mockingoose');
const userController = require('../controllers/userController');
const destinationController = require('../controllers/destinationController');
const photoController = require('../controllers/photoController');
const reviewController = require('../controllers/reviewController');
const User = require('../models/User');
const Destination = require('../models/Destination');
const Photo = require('../models/Photo');
const Review = require('../models/Review');
const {ObjectId} = require("mongodb");

describe('Retrieve Users from userController', () => {
    let req, res;

    //Was having issues with res error functions not being defined. So I set up the res object so we have usable res functions.
    // jest.fn().mockReturnThis() basically mimics the status function when calling res.status but doesn't actually send data or save it
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
    })

    // Clears the board after each 'it' test
    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should return all users with the statusCode of 200', async () => {
        const fakeUsers = [
            {
                _id: new ObjectId("6717e9d991e552553bdcd885"),
                gitHubId: 55414196,
                username: "Bladedkiwi",
                email: "bladedkiwi@byui.edu",
                profileUrl: "https://github.com/Bladedkiwi",
                destinationPhotos: [],
                userPhotos: [],
                reviews: []
            }
        ]

        //creates the request object to send over
        mockingoose(User).toReturn(fakeUsers, 'find');


        await userController.getUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(fakeUsers);

    })

    //Request uses Parameter ID to retrieve
    it('should get one user by ID', async () => {
        req = {params: {id: "6717e9d991e552553bdcd885"}}
        const mockUserId = {
            _id: new ObjectId("6717e9d991e552553bdcd885"),
            gitHubId: 55414196,
            username: "Bladedkiwi",
            email: "bladedkiwi@byui.edu",
            profileUrl: "https://github.com/Bladedkiwi",
            destinationPhotos: [],
            userPhotos: [],
            reviews: []
        }

        //creates the request object to send over
        mockingoose(User).toReturn(mockUserId, 'findOne');

        await userController.getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockUserId)


    })

})

describe('Retrieve Destinations from destinationController', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
    })

    // Clears the board after each 'it' test
    afterEach(() => {
        jest.clearAllMocks();
    })
    const mockDestinationAll  = [
        {
            _id: new ObjectId("6711c86c748fab8805238c57"),
            city: "Chicago",
            country: "France",
            photo: [],
            tourismSpots: [
                "Eiffel Tower",
                "Louvre Museum",
                "Notre-Dame Cathedral",
                "Dog Park"
            ],
            reviews: []
        },
        {
            _id: new ObjectId("671d3d22ffe524be4d7022bb"),
            city: "Rome",
            country: "Italy",
            photo: [],
            tourismSpots: [
                "blerufg",
                "sdffsd",
                "dfsdf"
            ],
            reviews: [
                "Hdfsdf dfsdf"
            ],
        }]

    it('should return all destinations with the statusCode of 200', async () => {
        //creates the request object to send over
        mockingoose(Destination).toReturn(mockDestinationAll, 'find');


        await destinationController.getDestinations(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockDestinationAll);

    })

    //Request uses Parameter ID to retrieve
    it('should get one destination by ID', async () => {
        req = {params: {id: "6711c86c748fab8805238c57"}}

        //creates the request object to send over
        mockingoose(Destination).toReturn(mockDestinationAll, 'findOne');

        await destinationController.getDestinationById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockDestinationAll)


    })

})

describe('Retrieve Reviews from reviewController', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
    })

    // Clears the board after each 'it' test
    afterEach(() => {
        jest.clearAllMocks();
    })
    const mockReviews  = [
        {
            _id: new ObjectId("671d4501ffe524be4d7022c7"),
            username: "JumpingJelly",
            stars: 4,
            comments: "Very Good!"
        },
        {
            _id: new ObjectId("671d4531ffe524be4d7022cb"),
            username: "Bllerrr",
            stars: 4,
            comments: "Very Badd!"
        }
    ]

    it('should return all users with the statusCode of 200', async () => {

        //creates the request object to send over
        mockingoose(Review).toReturn(mockReviews, 'find');


        await reviewController.getReviews(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockReviews);

    })

    //Request uses Parameter ID to retrieve
    it('should get one user by ID', async () => {
        req = {params: {id: "671d4501ffe524be4d7022c7"}}

        //creates the request object to send over
        mockingoose(Review).toReturn(mockReviews, 'findOne');

        await reviewController.getReviewById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockReviews)


    })

})

describe('Retrieve from photoController', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
    })

    // Clears the board after each 'it' test
    afterEach(() => {
        jest.clearAllMocks();
    })

    const mockPhotos = [
        {
            _id: new ObjectId("6713e1f549cfc8249e9c4aad"),
            title: "My Cat",
            imgUrl: "https://placecats.com/neo_banana/300/200",
            imgAlt: "Two dogs named Neo and Banana",
            description: "Photo of Neo and Banana such good boys"
        },
        {
            _id: new ObjectId("671d46caffe524be4d7022d1"),
            title: "The Neptune",
            imgUrl: "https://fluffyBeeard.com/neo_banana.png",
            imgAlt: "Two dogs named Neo and Banana",
            description: "Photo of Neo and Banana such good boys"
        }
    ]

    it('should return all photos with the statusCode of 200', async () => {

        //creates the request object to send over
        mockingoose(Photo).toReturn(mockPhotos, 'find');


        await photoController.getPhotos(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockPhotos);

    })

    //Request uses Parameter ID to retrieve
    it('should get one photo by ID', async () => {
        req = {params: {id: "671d46caffe524be4d7022d1"}}

        //creates the request object to send over
        mockingoose(Photo).toReturn(mockPhotos, 'findOne');

        await photoController.getPhotoById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockPhotos)


    })

})

