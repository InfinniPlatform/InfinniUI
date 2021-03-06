describe( 'Filter items', function() {
    describe( 'Filter items', function() {
        it( 'FilterItems should return all items that have given param', function() {
			// Given
            var filter = 'eq(index,-1.9)';
            var items = [
				{ Id: 1, index: -1.9 },
				{ Id: 2 },
				{ Id: 3 }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 1, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].index, -1.9, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items that have all given params', function() {
			// Given
            var filter = 'and(eq(phrase,\'param\'),eq(index,\'2\'))';
            var items = [
				{ Id: 1, phrase: 'param', index: '2' },
				{ Id: 2, index: '2' },
				{ Id: 3 }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 1, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items that have at least one of given params', function() {
			// Given
            var filter = 'or(eq(Id,1),eq(props.fontSize,\'30\'))';
            var items = [
				{ Id: 1 },
				{ Id: 2 },
				{ Id: 3 },
				{ Id: 4, props: { fontSize: '30' } }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 2, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 4, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items but not given item(s)', function() {
			// Given
            var filter = 'not(eq(Id,\'3\'))';
            var items = [
				{ Id: '1' },
				{ Id: '2' },
				{ Id: '3' }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 2, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 2, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items accept given item with given param', function() {
			// Given
            var filter = 'notEq(Id,2)';
            var items = [
				{ Id: 1 },
				{ Id: 2 },
				{ Id: 3 }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 2, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 3, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items that have value of given param greater then given value', function() {
			// Given
            var filter = 'gt(Id,2)';
            var items = [
				{ Id: 1 },
				{ Id: 2 },
				{ Id: 3 },
				{ Id: 4 },
				{ Id: 5 }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 3, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 3, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 4, 'filtered item is correct' );
            assert.equal( result1[ 2 ].Id, 5, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items that have value of given param greater then given value or equal to it', function() {
			// Given
            var filter = 'gte(birthday,date(\'2012-01-26T13:51:50.417Z\'))';
            var items = [
				{ Id: 1, birthday: 1327515910.417 },
				{ Id: 2, birthday: 1327512910.417 },
				{ Id: 3, birthday: 1327594910.417 },
				{ Id: 4, birthday: 1327591910.417 },
				{ Id: 5, birthday: 1327597910.417 }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 3, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 3, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 4, 'filtered item is correct' );
            assert.equal( result1[ 2 ].Id, 5, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items that have value of given param lower then given value', function() {
			// Given
            var filter = 'lt(Id,2)';
            var items = [
				{ Id: 1 },
				{ Id: 2 },
				{ Id: 3 },
				{ Id: 4 },
				{ Id: 5 }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 1, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items that have value of given param lower then given value or equal to it', function() {
			// Given
            var filter = 'lte(Id,3)';
            var items = [
				{ Id: 1 },
				{ Id: 2 },
				{ Id: 3 },
				{ Id: 4 },
				{ Id: 5 }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 3, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 2, 'filtered item is correct' );
            assert.equal( result1[ 2 ].Id, 3, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items that have in the given param value that match to one of given in values', function() {
			// Given
            var filter = 'in(index,1,3,4)';
            var items = [
				{ Id: 1, index: 2 },
				{ Id: 2, index: 3 },
				{ Id: 3, index: 2 },
				{ Id: 4, index: 4 },
				{ Id: 5, index: 1 }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 3, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 2, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 4, 'filtered item is correct' );
            assert.equal( result1[ 2 ].Id, 5, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items that have NOT in the given param value that match to one of given in values', function() {
			// Given
            var filter = 'notIn(index,1,3,4)';
            var items = [
				{ Id: 1, index: 2 },
				{ Id: 2, index: 3 },
				{ Id: 3, index: 2 },
				{ Id: 4, index: 4 },
				{ Id: 5, index: 1 }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 2, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 3, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items where exist the given param and it NOT equal to null or undefined', function() {
			// Given
            var filter = 'exists(index)';
            var items = [
				{ Id: 1, index: 2 },
				{ Id: 2, index: 3 },
				{ Id: 3, index: null },
				{ Id: 4, index: 4 },
				{ Id: 5 }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 3, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 2, 'filtered item is correct' );
            assert.equal( result1[ 2 ].Id, 4, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items where exist the given param and it NOT equal to null or undefined', function() {
			// Given
            var filter = 'exists(index,true)';
            var items = [
				{ Id: 1, index: null },
				{ Id: 2, index: 3 },
				{ Id: 3, index: 5 },
				{ Id: 4, index: 4 },
				{ Id: 5 }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 3, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 2, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 3, 'filtered item is correct' );
            assert.equal( result1[ 2 ].Id, 4, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items where doesn\'t exist the given param or it equal to null or undefined', function() {
			// Given
            var filter = 'exists(index,false)';
            var items = [
				{ Id: 1 },
				{ Id: 2, index: 3 },
				{ Id: 3, index: 5 },
				{ Id: 4, index: 4 },
				{ Id: 5, index: null }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 2, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 5, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items that have param with array of objects that all have the second param', function() {
			// Given
            var filter = 'match(props,eq(name,\'font\'))';
            var items = [
                {
                    Id: 1,
                    props: [ { name: 'font', size: 20 }, { name: 'font', family: 'Arial' }, { name: 'font', weight: 'bold' } ]
                },
                {
                    Id: 2,
                    props: [ { name: 'fontCommon', size: 24 }, { name: 'fontCommon', family: 'Tahoma' }, { name: 'fontCommon', weight: 'bold' } ]
                },
                {
                    Id: 3,
                    props: [ { name: 'font', size: 22 }, { name: 'font', family: 'Arial' }, { name: 'font', weight: 'bold' } ]
                },
                {
                    Id: 4,
                    props: [ { name: 'font', size: 20 }, { name: 'textIndent', size: 10 }, { name: 'font', weight: 'bold' } ]
                },
                {
                    Id: 5,
                    props: [ { name: 'font', size: 20 }, { name: 'font', family: 'Arial' }, { name: 'textIndent', size: 10 } ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 2, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 3, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items that suit to filter param', function() {
			// Given
            var filter = 'match(props,or(and(eq(name,\'font\'),eq(size,20)),and(eq(name,\'font\'),eq(size,10))))';
            var items = [
                {
                    Id: 1,
                    props: [ { name: 'font', size: 20 }, { name: 'font', size: 20 }, { name: 'font', size: 20 } ]
                },
                {
                    Id: 2,
                    props: [ { name: 'fontCommon', size: 24 }, { name: 'fontCommon', size: 20 }, { name: 'fontCommon', size: 20 } ]
                },
                {
                    Id: 3,
                    props: [ { name: 'font', size: 20 }, { name: 'font', size: 20 }, { name: 'font', size: 20 } ]
                },
                {
                    Id: 4,
                    props: [ { name: 'font', size: 20 }, { name: 'textIndent', size: 10 }, { name: 'font', weight: 'bold' } ]
                },
                {
                    Id: 5,
                    props: [ { name: 'font', size: 25 }, { name: 'font', size: 25 }, { name: 'font', size: 25 } ]
                },
                {
                    Id: 6,
                    props: [ { name: 'font', size: 10 }, { name: 'font', size: 10 }, { name: 'font', size: 10 } ]
                },
                {
                    Id: 7,
                    props: [ { name: 'font', size: 10 }, { name: 'font', size: 10 }, { name: 'font', size: 10 } ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 4, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 3, 'filtered item is correct' );
            assert.equal( result1[ 2 ].Id, 6, 'filtered item is correct' );
            assert.equal( result1[ 3 ].Id, 7, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items that suit to filter param', function() {
			// Given
            var filter = 'match(props,not(eq(name,\'font\')))';
            var items = [
                {
                    Id: 1,
                    props: [ { name: 'font', size: 20 }, { name: 'font', family: 'Arial' }, { name: 'font', weight: 'bold' } ]
                },
                {
                    Id: 2,
                    props: [ { name: 'fontCommon', size: 24 }, { name: 'fontCommon', family: 'Tahoma' }, { name: 'fontCommon', weight: 'bold' } ]
                },
                {
                    Id: 3,
                    props: [ { name: 'font', size: 22 }, { name: 'font', family: 'Arial' }, { name: 'font', weight: 'bold' } ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 1, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 2, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items that suit to filter param', function() {
			// Given
            var filter = 'match(props,not(notEq(name,\'font\')))';
            var items = [
                {
                    Id: 1,
                    props: [ { name: 'font', size: 20 }, { name: 'font', family: 'Arial' }, { name: 'font', weight: 'bold' } ]
                },
                {
                    Id: 2,
                    props: [ { name: 'fontCommon', size: 24 }, { name: 'fontCommon', family: 'Tahoma' }, { name: 'fontCommon', weight: 'bold' } ]
                },
                {
                    Id: 3,
                    props: [ { name: 'font', size: 22 }, { name: 'font', family: 'Arial' }, { name: 'font', weight: 'bold' } ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 2, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 3, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items where all elements in array from first param suit to a bunch of second param', function() {
			// Given
            var filter = 'all(items, 1, 2, 3, 4)';
            var items = [
                {
                    Id: 1,
                    items: [ 1, 2, 3, 4 ]
                },
                {
                    Id: 2,
                    items: [ 2, 3, 4, 5 ]
                },
                {
                    Id: 3,
                    items: [ 4, 6, 7, 8 ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 1, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items where all elements in array from first param suit to a bunch of second param', function() {
			// Given
            var filter = 'all(items, \'hello\', \'world\')';
            var items = [
                {
                    Id: 1,
                    items: [ 'hello', 'world', 'from', 'russia' ]
                },
                {
                    Id: 2,
                    items: [ 'hello', 'world' ]
                },
                {
                    Id: 3,
                    items: [ 'hello', 'world', 'from', 'russia' ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 1, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 2, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items where at least one element in array from first param suit to a bunch of second param', function() {
			// Given
            var filter = 'anyIn(items, 1, 2, 3, 4)';
            var items = [
                {
                    Id: 1,
                    items: [ 1, 2, 3, 4 ]
                },
                {
                    Id: 2,
                    items: [ 5, 6, 7, 8 ]
                },
                {
                    Id: 3,
                    items: [ 4, 6, 7, 8 ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 2, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 3, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items where all elements in array from first param NOT suit to a bunch of second param', function() {
			// Given
            var filter = 'anyNotIn(items, 1, 2, 3, 4)';
            var items = [
                {
                    Id: 1,
                    items: [ 1, 2, 3, 4 ]
                },
                {
                    Id: 2,
                    items: [ 5, 6, 7, 8 ]
                },
                {
                    Id: 3,
                    items: [ 4, 6, 7, 8 ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 1, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 2, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items where at least one element in array from first param suit to second param', function() {
			// Given
            var filter = 'anyEq(items, 144)';
            var items = [
                {
                    Id: 1,
                    items: [ 1, 2, 3, 4 ]
                },
                {
                    Id: 2,
                    items: [ 5, 144, 7, 8 ]
                },
                {
                    Id: 3,
                    items: [ 4, 6, 7, 8 ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 1, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 2, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items where at least one element in array from first param NOT suit to second param', function() {
			// Given
            var filter = 'anyNotEq(items, 144)';
            var items = [
                {
                    Id: 1,
                    items: [ 144, 144, 144, 144 ]
                },
                {
                    Id: 2,
                    items: [ 144, 144, 144, 144 ]
                },
                {
                    Id: 3,
                    items: [ 144, 8, 144, 144 ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 1, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 3, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items where at least one element in array from first param greater then second param', function() {
			// Given
            var filter = 'anyGt(items, 144)';
            var items = [
                {
                    Id: 1,
                    items: [ 144, 333, 144, 144 ]
                },
                {
                    Id: 2,
                    items: [ 144, 144, 144, 144 ]
                },
                {
                    Id: 3,
                    items: [ 144, 8, 144, 144 ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 1, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items where at least one element in array from first param greater or equal then second param', function() {
			// Given
            var filter = 'anyGte(items, 145)';
            var items = [
                {
                    Id: 1,
                    items: [ 144, 333, 144, 144 ]
                },
                {
                    Id: 2,
                    items: [ 144, 145, 144, 144 ]
                },
                {
                    Id: 3,
                    items: [ 144, 8, 144, 144 ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 2, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 2, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items where at least one element in array from first param lower then second param', function() {
			// Given
            var filter = 'anyLt(items, 144)';
            var items = [
                {
                    Id: 1,
                    items: [ 144, 144, 144, 144 ]
                },
                {
                    Id: 2,
                    items: [ 144, 144, 144, 144 ]
                },
                {
                    Id: 3,
                    items: [ 144, 8, 144, 144 ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 1, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 3, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items where at least one element in array from first param lower or equal then second param', function() {
			// Given
            var filter = 'anyLte(items, 140)';
            var items = [
                {
                    Id: 1,
                    items: [ 144, 144, 144, 144 ]
                },
                {
                    Id: 2,
                    items: [ 144, 140, 144, 144 ]
                },
                {
                    Id: 3,
                    items: [ 144, 8, 144, 144 ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 2, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 2, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 3, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items where length of array form first param equal to second param', function() {
			// Given
            var filter = 'sizeEq(items, 4)';
            var items = [
                {
                    Id: 1,
                    items: [ 144, 144, 144, 144, 544 ]
                },
                {
                    Id: 2,
                    items: [ 144, 140, 144, 144 ]
                },
                {
                    Id: 3,
                    items: [ 144, 8, 144, 144 ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 2, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 2, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 3, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items where length of array form first param NOT equal to second param', function() {
			// Given
            var filter = 'sizeNotEq(items, 4)';
            var items = [
                {
                    Id: 1,
                    items: [ 144, 144, 144, 144, 544 ]
                },
                {
                    Id: 2,
                    items: [ 144, 140, 144, 144 ]
                },
                {
                    Id: 3,
                    items: [ 144, 8, 144, 144 ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 1, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items where length of array form first param greater then second param', function() {
			// Given
            var filter = 'sizeGt(items, 4)';
            var items = [
                {
                    Id: 1,
                    items: [ 144, 144, 144, 144, 544 ]
                },
                {
                    Id: 2,
                    items: [ 144, 140, 144, 144 ]
                },
                {
                    Id: 3,
                    items: [ 144, 8, 144, 144 ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 1, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items where length of array form first param greater or equal then second param', function() {
			// Given
            var filter = 'sizeGte(items, 4)';
            var items = [
                {
                    Id: 1,
                    items: [ 144, 144, 144, 144, 544 ]
                },
                {
                    Id: 2,
                    items: [ 144, 140, 144, 144 ]
                },
                {
                    Id: 3,
                    items: [ 144, 8, 144 ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 2, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 2, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items where length of array form first param lower then second param', function() {
			// Given
            var filter = 'sizeLt(items, 4)';
            var items = [
                {
                    Id: 1,
                    items: [ 144, 144, 144, 144, 544 ]
                },
                {
                    Id: 2,
                    items: [ 144, 140, 144, 144 ]
                },
                {
                    Id: 3,
                    items: [ 144, 8, 144 ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 1, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 3, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items where length of array form first param lower or equal then second param', function() {
			// Given
            var filter = 'sizeLte(items, 4)';
            var items = [
                {
                    Id: 1,
                    items: [ 144, 144, 144, 144, 544 ]
                },
                {
                    Id: 2,
                    items: [ 144, 140, 144, 144 ]
                },
                {
                    Id: 3,
                    items: [ 144, 8, 144 ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 2, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 2, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 3, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items which suit to regexp expression', function() {
			// Given
            var filter = 'regexp(propName, \'[0-9]+\', g, i)';
            var items = [
                {
                    Id: 1,
                    propName: 'font123'
                },
                {
                    Id: 2,
                    propName: 'borderWidth'
                },
                {
                    Id: 3,
                    propName: 'backgroundSize'
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 1, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items which suit to regexp expression', function() {
			// Given
            var filter = 'regexp(firstName, \'^И(ван|рина)$\', g, i)';
            var items = [
                {
                    Id: 1,
                    firstName: 'Иван'
                },
                {
                    Id: 2,
                    firstName: 'Ирина'
                },
                {
                    Id: 3,
                    firstName: 'Вася'
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 2, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 2, 'filtered item is correct' );
        } );

        it( 'FilterItems should return all items have a text inner', function() {
			// Given
            var filter = 'text(\'hello world\')';
            var items = [
                {
                    Id: 1,
                    phrase: 'Hello world'
                },
                {
                    Id: 2,
                    friendPhrase: 'hello Ivan!'
                },
                {
                    Id: 3,
                    welcomePhrase: 'hello bro!',
                    friendList: [
						{ name: 'Vasya', welcomePhrase: 'hello world' },
						{ name: 'Ivan', welcomePhrase: 'hello there!' }
                    ]
                }
            ];
			// When
            var result1 = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result1, 2, 'length of filtered items is right' );
            assert.equal( result1[ 0 ].Id, 1, 'filtered item is correct' );
            assert.equal( result1[ 1 ].Id, 3, 'filtered item is correct' );
        } );

        it( 'should return all items that have value of given param starts with given value', function() {
			// Given
            var filter = 'startsWith(text,\'Cat\')';
            var items = [
                {
                    Id: 1,
                    text: 'cat has nine lives'
                },
                {
                    Id: 2,
                    text: 'My cat is really nice'
                },
                {
                    Id: 3,
                    text: 'Cat-and-mouse game'
                }
            ];
			// When
            var result = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result, 2, 'length of filtered items is right' );
            assert.equal( result[ 0 ].Id, 1, 'filtered item is correct' );
            assert.equal( result[ 1 ].Id, 3, 'filtered item is correct' );
        } );

        it( 'should return all items that have value of given param starts with given value (caseSensitive)', function() {
			// Given
            var filter = 'startsWith(text,\'Cat\',false)';
            var items = [
                {
                    Id: 1,
                    text: 'cat has nine lives'
                },
                {
                    Id: 2,
                    text: 'Cat-and-mouse game'
                },
                {
                    Id: 3,
                    text: 'My cat is really nice'
                }
            ];
			// When
            var result = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result, 1, 'length of filtered items is right' );
            assert.equal( result[ 0 ].Id, 2, 'filtered item is correct' );
        } );

        it( 'should return all items that have value of given param ends with given value', function() {
			// Given
            var filter = 'endsWith(text,\'Test\')';
            var items = [
                {
                    Id: 1,
                    text: 'End of string is word Test'
                },
                {
                    Id: 2,
                    text: 'Test must be passed'
                },
                {
                    Id: 3,
                    text: 'My test'
                }
            ];
			// When
            var result = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result, 2, 'length of filtered items is right' );
            assert.equal( result[ 0 ].Id, 1, 'filtered item is correct' );
            assert.equal( result[ 1 ].Id, 3, 'filtered item is correct' );
        } );

        it( 'should return all items that have value of given param ends with given value (caseSensitive)', function() {
			// Given
            var filter = 'endsWith(text,\'Test\',false)';
            var items = [
                {
                    Id: 1,
                    text: 'Test must be passed'
                },
                {
                    Id: 2,
                    text: 'End of string is word Test'
                },
                {
                    Id: 3,
                    text: 'My test'
                }
            ];
			// When
            var result = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result, 1, 'length of filtered items is right' );
            assert.equal( result[ 0 ].Id, 2, 'filtered item is correct' );
        } );

        it( 'should return all items that have value of given param contains given value', function() {
			// Given
            var filter = 'contains(text,\'Test\')';
            var items = [
                {
                    Id: 1,
                    text: 'Test at starting'
                },
                {
                    Id: 2,
                    text: 'Without search string'
                },
                {
                    Id: 3,
                    text: 'abracadabratestabracadabra'
                },
                {
                    Id: 4,
                    text: 't e s t'
                },
                {
                    Id: 5,
                    text: 'last test'
                }
            ];
			// When
            var result = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result, 3, 'length of filtered items is right' );
            assert.equal( result[ 0 ].Id, 1, 'filtered item is correct' );
            assert.equal( result[ 1 ].Id, 3, 'filtered item is correct' );
            assert.equal( result[ 2 ].Id, 5, 'filtered item is correct' );
        } );

        it( 'should return all items that have value of given param contains given value (caseSensitive)', function() {
			// Given
            var filter = 'contains(text,\'Test\',false)';
            var items = [
                {
                    Id: 1,
                    text: 'test at starting'
                },
                {
                    Id: 2,
                    text: 'Without search string'
                },
                {
                    Id: 3,
                    text: 'abracadabraTestabracadabra'
                },
                {
                    Id: 4,
                    text: 't e s t'
                },
                {
                    Id: 5,
                    text: 'last test'
                }
            ];
			// When
            var result = InfinniUI.FilterItems( items, filter );
			// Then
            assert.lengthOf( result, 1, 'length of filtered items is right' );
            assert.equal( result[ 0 ].Id, 3, 'filtered item is correct' );
        } );


    } );
} );
