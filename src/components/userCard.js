import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Header, Grid, Image } from 'semantic-ui-react';
import PollQuestion from './pollQuestion'
import PollResult from './pollResult'
import PollTeaser from './pollTeaser'
import { colors } from '../utils/helpers'
import { Redirect } from 'react-router-dom'


const pollTypes = {
    POLL_TEASER: 'POLL_TEASER',
    POLL_QUESTION: 'POLL_QUESTION',
    POLL_RESULT: 'POLL_RESULT'
}

const PollContent = props => {
    const { pollType, question, unanswered } = props

    switch (pollType) {
        case pollTypes.POLL_TEASER:
            return <PollTeaser question={question} unanswered={unanswered} />
        case pollTypes.POLL_QUESTION:
            return <PollQuestion question={question} />;
        case pollTypes.POLL_RESULT:
            return <PollResult question={question} />;
        default:
            return;
    }
}
export class UserCard extends Component {
    static propTypes = {
        question: PropTypes.object.isRequired,
        author: PropTypes.object.isRequired,
        pollType: PropTypes.string.isRequired,
        unanswered: PropTypes.bool,
        question_id: PropTypes.string
    };
    render() {
        const { author, question, pollType, badPath, unanswered = null } = this.props;
        if (badPath === true) {
            return <Redirect to="/questions/bad_id" />
        }
        const tabColor = unanswered === true ? colors.red : colors.blue;
        const borderTop =
            unanswered === null
                ? `1px solid ${colors.grey}`
                : `2px solid ${tabColor.hex}`;

        return (
            <Segment.Group>
                <Header
                    as="h5"
                    textAlign="left"
                    block
                    attached="top"
                    style={{
                        borderTop: borderTop
                    }}
                > {author.name} asks:
                </Header>

                <Grid divided padded>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Image src={author.avatarURL} />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <PollContent
                                pollType={pollType}
                                question={question}
                                unanswered={unanswered}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment.Group>
        );
    }
}

function mapStateToProps(
    { users, questions, authedUser },
    { match, question_id }
) {
    let question, pollType, author, badPath = false;
    if (question_id !== undefined) {
        question = questions[question_id];
        author = users[question.author]
        pollType = pollTypes.POLL_TEASER;
    } else {
        const { question_id } = match.params;
        question = questions[question_id];
        const user = users[authedUser];

        if (question === undefined) {
            badPath = true
        } else {
            author = users[question.author]
            pollType = pollTypes.POLL_QUESTION;
            if (Object.keys(user.answers).includes(question.id)) {
                pollType = pollTypes.POLL_RESULT;
            }
        }

    }
    return {
        question,
        author,
        pollType,
        badPath
    };
}

export default connect(mapStateToProps)(UserCard);