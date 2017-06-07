/**
 *
 * @param actionMetadata
 * @param builder
 * @param builderParams
 * @returns {{get: get}}
 * @constructor
 */
function ActionFactory( actionMetadata, builder, builderParams ) {
    return {
        get: get
    };

    function get() {
        return builder.build( actionMetadata, builderParams );
    }
}

InfinniUI.ActionFactory = ActionFactory;
