const Community = require('../models/Community');

exports.createCommunity = async (req, res) => {
  try {
    const { name, description, privacy } = req.body;
    const newCommunity = new Community({
      name,
      description,
      privacy,
      creator: req.user.id,
      members: [req.user.id]
    });
    const community = await newCommunity.save();
    res.json(community);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPublicCommunities = async (req, res) => {
  try {
    const communities = await Community.find({ privacy: 'public' }).populate('creator', 'name');
    res.json(communities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.joinCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).json({ msg: 'Community not found' });
    }
    if (community.privacy === 'private') {
      if (!community.pendingRequests.includes(req.user.id)) {
        community.pendingRequests.push(req.user.id);
        await community.save();
        return res.json({ msg: 'Join request sent' });
      } else {
        return res.status(400).json({ msg: 'Join request already sent' });
      }
    } else {
      if (!community.members.includes(req.user.id)) {
        community.members.push(req.user.id);
        await community.save();
        return res.json({ msg: 'Joined community' });
      } else {
        return res.status(400).json({ msg: 'Already a member' });
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.approveJoinRequest = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).json({ msg: 'Community not found' });
    }
    if (community.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    const index = community.pendingRequests.indexOf(req.params.userId);
    if (index > -1) {
      community.pendingRequests.splice(index, 1);
      community.members.push(req.params.userId);
      await community.save();
      res.json({ msg: 'Request approved' });
    } else {
      res.status(400).json({ msg: 'No pending request for this user' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};