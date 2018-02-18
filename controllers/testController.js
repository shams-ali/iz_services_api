var testModel = require('../models/testModel.js');

/**
 * testController.js
 *
 * @description :: Server-side logic for managing tests.
 */
module.exports = {

    /**
     * testController.list()
     */
    list: function (req, res) {
        testModel.find(function (err, tests) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting test.',
                    error: err
                });
            }
            return res.json(tests);
        });
    },

    /**
     * testController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        testModel.findOne({_id: id}, function (err, test) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting test.',
                    error: err
                });
            }
            if (!test) {
                return res.status(404).json({
                    message: 'No such test'
                });
            }
            return res.json(test);
        });
    },

    /**
     * testController.create()
     */
    create: function (req, res) {
        var test = new testModel({
			test : req.body.test

        });

        test.save(function (err, test) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating test',
                    error: err
                });
            }
            return res.status(201).json(test);
        });
    },

    /**
     * testController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        testModel.findOne({_id: id}, function (err, test) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting test',
                    error: err
                });
            }
            if (!test) {
                return res.status(404).json({
                    message: 'No such test'
                });
            }

            test.test = req.body.test ? req.body.test : test.test;
			
            test.save(function (err, test) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating test.',
                        error: err
                    });
                }

                return res.json(test);
            });
        });
    },

    /**
     * testController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        testModel.findByIdAndRemove(id, function (err, test) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the test.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
