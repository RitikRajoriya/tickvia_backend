exports.routetrip = async (req,res) =>{

    try {
        let { origin, destination, departureDate, adults = 1 } = req.body;
    
        // Ensure correct date format
        departureDate = new Date(departureDate).toISOString().split('T')[0];
    
    } catch (error) {
        
    }
};