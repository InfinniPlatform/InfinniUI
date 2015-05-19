describe("IsGuidBuilder", function(){
   it("should return true if target is GUID", function(){
       // Given
       var factory = new createValidationBuilderFactory();

       var meta = {
           IsGuid:{
               Property: "Property1",
               Message: "Message1"
           }
       };

       // When
       var validator = factory.build(meta);

       // Then
       assert.equal(validator.message, meta.IsGuid.Message);
       assert.equal(validator.value, meta.IsGuid.Value);
    });
});